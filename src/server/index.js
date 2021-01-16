const compression = require('compression');
const polka = require('polka');
const sirv = require('sirv');
const { SERVER__PORT } = require('../constants');
const log = require('../utils/logger')('server');
const socket = require('./socket');
const shell = require('./shell');

const { NODE_ENV } = process.env;
const dev = NODE_ENV !== 'production';
const middleware = [
  compression({ threshold: 0 }),
  sirv('./dist/public', { dev, etag: true }),
];

const { server } = polka()
  .use(...middleware)
  // .all('*', (req, res, next) => {
  //   console.log('headers', req.headers);
  //   if (process.env.HEROKU) {
  //     const forwardedProtoHeader = req.headers['x-forwarded-proto'];
  //     log(`X-Forwarded-Proto header: "${forwardedProtoHeader}"`);

  //     next();
  //   }
  //   else next();
  // })
  .get('/', (req, res) => {
    res.end(shell({ view: 'home' }));
  })
  .listen(SERVER__PORT, err => {
    if (err) log('Error', err);
    log(`Server running at: http://localhost:${SERVER__PORT}`);
  });

const serverSocket = socket(server);

function handleServerDeath(signal) {
  const { WS__MSG_TYPE__SERVER_DOWN } = require('../constants');

  log(`\n[${signal}] Server closing`);
  
  // NOTE - I've seen this NOT work if there are some zombie WS processes
  // floating around from a previous bad run. So try killing all `node`
  // instances and see if things work after.
  // NOTE - This also only works when the WS isn't being proxied via BrowserSync
  // while in development. So if you go to the non-proxied port, things will
  // behave as expected.
  serverSocket.emitToAll(WS__MSG_TYPE__SERVER_DOWN);
  serverSocket.serverInstance.close();
  
  server.close(() => {
    log(`[${signal}] Server closed`);
    process.exit(0);
  });
}

[
  'SIGINT', 
  'SIGQUIT',
  'SIGTERM', 
].forEach(signal => process.on(signal, handleServerDeath));

const { LOGGER__NAMESPACE } = require('../constants');

let logger;

if (
  process.env.NODE_ENV === 'production'
  && process.env.WP_BUNDLE
) {
  logger = () => () => {};
}
else {
  const debug = require('debug');
  const rootLogger = debug(LOGGER__NAMESPACE);
  const enabled = [
    `${LOGGER__NAMESPACE}:*`,
  ];
  const disabled = [
    `-${LOGGER__NAMESPACE}:*heartbeat*`,
  ];

  logger = (namespace = '') => (namespace)
    ? rootLogger.extend(namespace)
    : rootLogger;

  debug.enable( [ ...enabled, ...disabled ].join(',') );
}

module.exports = logger;

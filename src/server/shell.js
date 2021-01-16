const {
  APP__TITLE,
  DOM__SVELTE_MOUNT_POINT,
} = require('../constants');

const shell = ({ params, view } = {}) => {
  const MANIFEST_PATH = '../public/manifest.json';
  if (process.env.NODE_ENV !== 'production') delete require.cache[require.resolve(MANIFEST_PATH)];
  const manifest = require(MANIFEST_PATH);
  const buildNumber = process.env.SOURCE_VERSION; // exposed by Heroku during build
  const viewCSS = (manifest[`${view}.css`])
    ? `<link rel="stylesheet" href="${manifest[`${view}.css`]}">`
    : '';

  return `
    <!doctype html>
    <html lang="en">
    <head>
      <title>${APP__TITLE}</title>

      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      
      <link rel="stylesheet" href="${manifest['global.css']}">
      ${viewCSS}

      <script>
        window.app = {
          buildNumber: ${buildNumber},
          params: ${JSON.stringify(params || {})},
        };

        // The request won't be made on all Browsers unless it's made before
        // \`DOMContentLoaded\` is fired.
        window.Notification.requestPermission();
      </script>
    </head>
    <body class="no-js">
      <script>
        document.body.classList.remove('no-js');
      </script>
      <svg style="display:none; position:absolute" width="0" height="0">
        <symbol id="ui-icon__avatar" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
            <path fill="currentColor" d="M2465 4264 c-289 -31 -536 -151 -731 -355 -87 -91 -142 -171 -199 -292 -153 -319 -150 -669 9 -992 136 -276 366 -479 654 -574 512 -171 1078 43 1346 509 188 327 203 714 42 1056 -57 119 -112 200 -205 296 -209 220 -469 337 -776 351 -55 3 -118 3 -140 1z"/>
            <path fill="currentColor" d="M2213 1700 c-243 -17 -479 -62 -698 -135 -776 -256 -1312 -837 -1370 -1487 l-7 -78 2422 0 2422 0 -7 78 c-47 531 -415 1023 -995 1330 -260 138 -591 238 -919 278 -149 18 -668 27 -848 14z"/>
          </g>
        </symbol>
      </svg>
      
      <div class="root">
        <div class="loading-msg">
          <span class="msg">Loading...</span>
          <noscript>
            This App requires Javascript. You'll have to enable it in order to proceed.
          </noscript>
        </div>
        <div id="${DOM__SVELTE_MOUNT_POINT}"></div>
      </div>
      
      <script src="${manifest['vendor.js']}"></script>
      <script src="${manifest[`${view}.js`]}"></script>
    </body>
    </html>
  `;
};

module.exports = shell;

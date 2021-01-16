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

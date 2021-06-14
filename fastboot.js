/*eslint-env node*/

// TODO: reinstate once stable:
// "ember-cli-fastboot": "^2.2.3",
// "fastboot-app-server": "^3.0.0",
// "fastboot-watch-notifier": "^3.0.0",

const FastBootAppServer = require('fastboot-app-server');
const FastBootWatchNotifier = require('fastboot-watch-notifier');

const distPath = 'dist';

const notifier = new FastBootWatchNotifier({
  distPath,
  debounceDelay: 250,
  saneOptions: {
    poll: true
  }
});

// 8000 lmpa.interflux.com
// 8001 new.interflux.com

const server = new FastBootAppServer({
  distPath,
  notifier,
  gzip: true,
  host: '0.0.0.0',
  port: 8001
});

server.start();

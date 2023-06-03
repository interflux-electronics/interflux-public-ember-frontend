/*eslint-env node*/

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

// 4200 interflux.com
// 4300 admin.interflux.com
// 4400 lmpa.interflux.com

const server = new FastBootAppServer({
  distPath,
  notifier,
  gzip: true,
  host: '127.0.0.1',
  port: 4200
});

server.start();

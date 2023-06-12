/*eslint-env node*/

const FastBootAppServer = require('fastboot-app-server');
const FastBootWatchNotifier = require('fastboot-watch-notifier');

const env = require('dotenv').config();

const notifier = new FastBootWatchNotifier({
  distPath: 'dist',
  debounceDelay: 250,
  saneOptions: {
    poll: true
  }
});

const server = new FastBootAppServer({
  distPath: 'dist',
  notifier,
  gzip: true,
  host: '127.0.0.1',
  port: env.PORT
});

server.start();

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const ENV = require('./config/environment')(EmberApp.env());

// To make CSS environment aware we assign a new src to output map.
// The src changes with the environment.
const cssMap = {};
cssMap[ENV.environment] = '/assets/app.css';

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    outputPaths: {
      app: {
        js: '/assets/app.js',
        css: cssMap
      }
    },

    // Makes SASS listen to file changes in the component folders
    sassOptions: {
      includePaths: ['app/pods'],
      overwrite: true,
      sourceMap: false
    },

    // Adds CSS browser prefixes
    autoprefixer: {
      cascade: false,
      remove: false
    },

    // Fingerprint files with the git revision rather than the MD5 to deduct from which deploy.
    fingerprint: {
      customHash: ENV.gitRevision
    },

    // The native Javascript fetch() API is now well supported in all browsers, however it does
    // not exist in Node. This breaks our server side rendering (Ember Fastboot). This package
    // uses node-fetch on our backend (Node) and the native JS fetch() on our frontend.
    'ember-fetch': {
      preferNative: true,
      nativePromise: true
    }
  });

  return app.toTree();
};

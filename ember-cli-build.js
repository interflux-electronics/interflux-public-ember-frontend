'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const ENV = require('./config/environment')(EmberApp.env());

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Makes SASS listen to file changes in the component folders
    sassOptions: {
      includePaths: ['app/routables'],
      overwrite: true
    },

    // Adds CSS browser prefixes
    autoprefixer: {
      cascade: false,
      remove: false
    },

    // Only minify CSS in production to speed up development and tests.
    minifyCSS: {
      enabled: ENV.isProduction
    },

    // Only minify JS in production to speed up development and tests.
    minifyJS: {
      enabled: ENV.isProduction
    },

    // Enable source maps in all environments because it helps debugging.
    sourcemaps: {
      enabled: true,
      extensions: ['js']
    },

    // Because the 2 JS and 2 CSS bundles are being HTTP2 pushed alongside the
    // index.html by Nginx, we need the name to be predictable and thus have
    // no fingerprints. Cache busting is not needed because the JS and CSS
    // bundles we'll never cache (they update too often). Images, videos and
    // fonts we'll highly cache though.
    fingerprint: {
      enabled: false
    }
  });

  return app.toTree();
};

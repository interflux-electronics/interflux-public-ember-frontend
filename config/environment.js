'use strict';

const PKG = require('../package.json');

// Expose the git hash for fingerprinting and error logging
const git = require('git-rev-sync');
const gitBranch = git.branch();
const gitRevision = git.short();

// The Rails API namespace
const apiNamespace = 'v1/public';

// Where the Rails backend is located
const apiHosts = {
  development: 'http://localhost:3000',
  production: 'https://api.interflux.com'
};

// Where this Ember app is located
const appHosts = {
  development: 'http://localhost:4200',
  production: 'https://app.interflux.com'
};

// Where the CDN is located
const cdnHosts = {
  development: 'http://localhost:9000',
  production: 'https://cdn.interflux.com'
};

// The mobile browser's theme colour
// https://developers.google.com/web/fundamentals/design-and-ux/browser-customization/
const themeColour = '#23578c';

module.exports = function(env) {
  // Environment flags
  const isDevelopment = env === 'development';
  const isProduction = env === 'production';
  const isTest = env === 'test';

  // Hosts
  const apiHost = apiHosts[env];
  const appHost = appHosts[env];
  const cdnHost = cdnHosts[env];

  const isAndroid = process.env.ANDROID_BUILD === 'true';
  const isIOS = process.env.IOS_BUILD === 'true';
  const isMobileApp = isAndroid || isIOS;
  const isWebApp = !isMobileApp;

  // Change the root url to an empty string if this is a native build because cordova requires it.
  const locationType = isMobileApp && !isTest ? 'hash' : 'history';
  const rootURL = isMobileApp && !isTest ? '' : '/';

  let ENV = {
    appName: PKG.name,
    modulePrefix: PKG.name,
    environment: env,
    rootURL,
    locationType,
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },
    APP: {},

    buildConfig: {
      isProduction,
      isDevelopment,
      isTest,
      isAndroid,
      isIOS,
      isMobileApp,
      isWebApp,
      apiHost,
      appHost,
      cdnHost,
      apiNamespace,
      gitBranch,
      gitRevision,
      themeColour
    }

    // fastboot: {
    //   hostWhitelist: ['interflux.io', '0.0.0.0:8002', 'localhost:4200']
    // },

    // googleAnalytics: {
    //   // trackingId: 'UA-34474019-11'
    // }
  };

  if (isDevelopment) {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (isTest) {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (isProduction) {
    // here you can enable a production-specific feature
  }

  return ENV;
};

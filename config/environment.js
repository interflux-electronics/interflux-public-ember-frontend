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
  production: 'https://rails.api.interflux.com',
  development: {
    web: 'https://localhost:3000',
    ios: 'https://localhost:3000',
    android: 'http://10.0.2.2:3000'
  },
  test: 'http://localhost:3000'
};

// Where this Ember app is located
const publicHosts = {
  production: 'https://interflux.com',
  development: {
    web: 'https://localhost:4200',
    ios: 'https://localhost:4200',
    android: 'http://10.0.2.2:4400'
  },
  test: 'http://localhost:4400'
};

const adminHosts = {
  development: 'https://localhost:4300',
  production: 'https://admin.interflux.com'
};

// Where the CDN is located
const cdnHosts = {
  production: 'https://cdn.interflux.com',
  development: {
    web: 'http://localhost:9000',
    ios: 'http://localhost:9000',
    android: 'http://10.0.2.2:9000'
  },
  test: 'http://localhost:9000'
};

// Where the old website is located
const oldHosts = {
  production: 'https://old.interflux.com',
  development: 'http://localhost:9100',
  test: 'http://localhost:9100'
};

// The UTC date and time of when this build was compiled
const date = new Date();
const buildTimestamp = date.toUTCString();

module.exports = function (env) {
  // Environments
  const isProduction = env === 'production';
  const isDevelopment = env === 'development';
  const isTest = env === 'test';
  const environment = env;

  // Platforms
  const isAndroid = process.env.ANDROID_BUILD === 'true';
  const isIOS = process.env.IOS_BUILD === 'true';
  const isMobileApp = isAndroid || isIOS;
  const isWebApp = !isMobileApp;
  const platform = isWebApp ? 'web' : isIOS ? 'ios' : 'android';

  // Hosts
  const apiHost = isDevelopment ? apiHosts[env][platform] : apiHosts[env];
  const publicHost = isDevelopment
    ? publicHosts[env][platform]
    : publicHosts[env];
  const adminHost = adminHosts[env];
  const cdnHost = isDevelopment ? cdnHosts[env][platform] : cdnHosts[env];
  const oldHost = oldHosts[env];

  // Change the root url to an empty string if this is a native build because cordova requires it.
  const locationType = isMobileApp && !isTest ? 'hash' : 'history';
  const rootURL = isMobileApp && !isTest ? '' : '/';

  const ENV = {
    appName: PKG.name,
    modulePrefix: PKG.name,
    podModulePrefix: `${PKG.name}/pods`,
    environment,
    rootURL,
    locationType,
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },
    APP: {},

    isDevelopment,
    isTest,
    isProduction,
    apiHost,
    publicHost,
    adminHost,
    cdnHost,
    oldHost,
    apiNamespace,
    gitBranch,
    gitRevision,
    buildTimestamp,

    'mapbox-gl': {
      accessToken: `pk.eyJ1IjoianctZmxvYXRwbGFuZS1kZXYiLCJhIjoiY2s4bW02N3UyMG93MTNycGduNzJqOGt6OCJ9.PHUKAn3CMmN73tmJXpa0ug`
    },

    showdown: {},

    fastboot: {
      hostWhitelist: [
        'interflux.com',
        'www.interflux.com',
        'new.interflux.com',
        /^0.0.0.0:\d+$/,
        /^127.0.0.1:\d+$/,
        'localhost:4400'
      ]
    }
  };

  if (isTest) {
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  return ENV;
};

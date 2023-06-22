'use strict';

const PKG = require('../package.json');

// Expose the git hash for fingerprinting and error logging
const git = require('git-rev-sync');
const gitBranch = git.branch();
const gitRevision = git.short();

// The UTC date and time of when this build was compiled
const date = new Date();
const buildTimestamp = date.toUTCString();

module.exports = function (env) {
  const environment = env;
  const isProduction = env === 'production';
  const isDevelopment = env === 'development';
  const isTest = env === 'test';
  const locale = process.env.LANGUAGE;
  const host = {
    en: 'https://interflux.com',
    de: 'https://interflux.de',
    fr: 'https://interflux.fr',
    zh: 'https://interflux.cn.com',
    'es-ES': 'https://interflux.es',
    'es-MX': 'https://interflux.mx'
  }[locale];

  const ENV = {
    appName: PKG.name,
    modulePrefix: PKG.name,
    podModulePrefix: `${PKG.name}/pods`,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },
    APP: {},

    environment,
    isProduction,
    isDevelopment,
    isTest,
    locale,
    gitBranch,
    gitRevision,
    buildTimestamp,

    publicHost: {
      production: host,
      development: host,
      test: 'http://localhost:4200'
    }[env],

    cdnHost: {
      production: 'https://cdn.interflux.com',
      development: 'http://localhost:9000',
      test: 'http://localhost:9000'
    }[env],

    apiHost: {
      production: 'https://rails.api.interflux.com',
      development: 'http://localhost:3000',
      test: 'http://localhost:3000'
    }[env],

    apiNamespace: 'v1/public',

    fastboot: {
      development: {
        hostWhitelist: [/^0.0.0.0:\d+$/, /^127.0.0.1:\d+$/, 'localhost:4200']
      },
      production: {
        hostWhitelist: [
          'interflux.com',
          'interflux.de',
          'interflux.es',
          'interflux.mx',
          'interflux.fr',
          'interflux.cn.com'
        ]
      }
    }[env],

    'mapbox-gl': {
      accessToken: `pk.eyJ1IjoianctZmxvYXRwbGFuZS1kZXYiLCJhIjoiY2s4bW02N3UyMG93MTNycGduNzJqOGt6OCJ9.PHUKAn3CMmN73tmJXpa0ug`
    },

    showdown: {}
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

/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function (/* env */) {
  return {
    clientAllowedKeys: ['LANGUAGE', 'PORT', 'HOST'],
    fastbootAllowedKeys: ['LANGUAGE', 'PORT', 'HOST'],
    failOnMissingKey: true,
    path: path.join(path.dirname(__dirname), '.env')
  };
};

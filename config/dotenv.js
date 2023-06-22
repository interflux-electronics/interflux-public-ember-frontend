/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function (/* env */) {
  return {
    clientAllowedKeys: ['HOST', 'PORT'],
    fastbootAllowedKeys: ['HOST', 'PORT'],
    failOnMissingKey: true,
    path: path.join(path.dirname(__dirname), '.env')
  };
};

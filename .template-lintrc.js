'use strict';

module.exports = {
  extends: 'recommended',

  rules: {
    'no-down-event-binding': 'off',
    'no-duplicate-id': 'off',
    'no-duplicate-landmark-elements': 'off',
    'no-redundant-landmark-role': 'off',
    'require-input-label': 'off',
    'no-potential-path-strings': 'warn',
    'no-invalid-interactive': 'warn',
    'no-html-comments': 'warn',
    'require-presentational-children': 'warn',
    'no-whitespace-within-word': 'off',
    'no-obsolete-elements': 'warn',
    'no-implicit-this': { allow: ['cdn'] }
  }
};

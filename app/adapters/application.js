// This adapter is responsible for converting all outgoing API requests to be
// formatted according the JSON API specs.
// https://jsonapi.org/
// https://www.emberjs.com/api/ember-data/release/classes/DS.JSONAPIAdapter
//
// The fetch mixin is responsible for Ember Data to use HTML5 fetch() polyfill
// instead of the dreaded jQuery $.ajax().
// https://github.com/ember-cli/ember-fetch
//
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import config from 'ember-get-config';
import { computed } from '@ember/object';
import { pluralize } from 'ember-inflector';

const { apiHost, apiNamespace } = config.buildConfig;

export default JSONAPIAdapter.extend({
  host: apiHost,
  namespace: apiNamespace,

  // Dynamically set the headers on each request.
  // Docs: https://guides.emberjs.com/release/models/customizing-adapters/
  headers: computed({
    get() {
      const headers = {};

      // We declare to the back-end our requests our JSON API compliant.
      headers['Content-Type'] = 'application/vnd.api+json';

      // We state that we expect the back-end responses to be JSON API compliant.
      headers['Accept'] = 'application/vnd.api+json';

      return headers;
    }
  }),

  // Convert the Ember model name to something Rails would recognise:
  // Rails expects underscored resources
  // Rails expects pluralized resources
  pathForType: function(type) {
    return pluralize(type);
  }
});

import Service from '@ember/service';
import ENV from 'interflux/config/environment';
import { inject as service } from '@ember/service';
import {
  AbortError,
  ConflictError,
  InvalidError,
  NotFoundError,
  ServerError,
  TimeoutError,
  UnauthorizedError,
  ForbiddenError
} from '@ember-data/adapter/error';

export default class ApiService extends Service {
  @service auth;
  @service fastboot;
  @service visit;

  // Where the API lives
  // In production: https://rails.api.interflux.com
  // In developement: http://localhost:3000
  host = ENV.apiHost;

  // The base path for all requests this app makes to the API
  // Currently this is "v1/admin"
  //
  // In production:
  // GET https://rails.api.interflux.com/v1/admin/countries
  // POST https://rails.api.interflux.com/v1/admin/product
  //
  // In development:
  // GET http://localhost:3000/v1/admin/countries
  // POST http://localhost:3000/v1/admin/product
  //
  namespace = ENV.apiNamespace;

  // The headers to add to every request to our API.
  // Docs: https://guides.emberjs.com/release/models/customizing-adapters/
  get headers() {
    const headers = {};

    // With the Content-Type header 'application/vnd.api+json' we say that
    // what we send to the API is JSON API compliant.
    headers['Content-Type'] = 'application/vnd.api+json';

    // With the Accept header 'application/vnd.api+json' we say that what we
    // expect back from the API is JSON API compliant data.
    headers['Accept'] = 'application/vnd.api+json';

    // Each request will send up the Visit UUID so that subsequent request can
    // be grouped. This is unique to this project, thus the X namespace.
    headers['Visit-ID'] = this.visit.id;

    // Add visit metadata to the requests.
    if (this.fastboot.isFastBoot) {
      const request = this.fastboot.request;
      headers['SSR-Host'] = request.host;
      headers['SSR-Referer'] = request.headers.headers['referer'].join(',');
      headers['SSR-User-Agent'] = request.headers.headers['user-agent'][0];
    } else {
      headers['Browser-Width'] = window.innerWidth;
      headers['Browser-Height'] = window.innerHeight;
    }

    return headers;
  }

  logError(response) {
    if (
      response &&
      response.errors &&
      response.errors.length &&
      response.errors[0]
    ) {
      const firstError = response.errors[0];
      const { status, code, detail } = firstError;
      if (status && code && detail) {
        console.error([status, code, detail].join(' - '));
      }
    }

    // The request to the server was aborted
    // https://emberjs.com/api/ember-data/3.0/classes/DS.AbortError
    if (response instanceof AbortError) {
      if (ENV.isProduction) {
        if (navigator.onLine) {
          console.error('Looks like the production API is down.');
        } else {
          console.error('Looks like you are offline.');
        }
      } else if (ENV.isDevelopment) {
        console.error('Looks like your local API is down.');
      } else if (ENV.isTest) {
        console.error('Looks like we did not hit Mirage.');
      } else {
        console.error('This should never show.');
      }
    }

    if (response instanceof InvalidError) {
      // https://emberjs.com/api/ember-data/3.0/classes/DS.InvalidError
      // Ember Data expects a source/pointer
      console.error('422 - This request got rejected because of invalid data.');
    } else if (response instanceof UnauthorizedError) {
      console.error('401 - You are not authorised to make this request.');
      console.warn('Reseting authentication data');
      console.warn('Redirecting to login');
      this.auth.reset();
    } else if (response instanceof ForbiddenError) {
      console.error('403 - You are not allowed to make this request.');
    } else if (response instanceof NotFoundError) {
      console.error('404 - The API does not know this route.');
    } else if (response instanceof ConflictError) {
      console.error('409 - The request is conflicting.');
    } else if (response instanceof ServerError) {
      console.error('500 - The server is down!');
    } else if (response instanceof TimeoutError) {
      console.error(
        '504 - The request timed out. Check your network and API load.'
      );
    } else {
      console.error('Unknown error');
      console.error(response);
      console.debug(
        'DEBUG: Is Rails running? If yes, check the terminal logs.'
      );
    }
  }
}

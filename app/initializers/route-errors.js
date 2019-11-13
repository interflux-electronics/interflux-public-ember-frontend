import DS from 'ember-data';
import Route from '@ember/routing/route';
import config from 'ember-get-config';
import { inject as service } from '@ember/service';
// import { relativeRoute } from '../helpers/relative-route';

const { isDevelopment, isProduction, isTest } = config;
const {
  AbortError,
  ConflictError,
  InvalidError,
  NotFoundError,
  ServerError,
  TimeoutError,
  UnauthorizedError,
  ForbiddenError
} = DS;

// For AJAX
// https://github.com/ember-cli/ember-ajax/issues/57

// Documentation on DS.AdaptorErrors
// http://docs.w3cub.com/ember/classes/ds.adaptererror/

export function initialize() {
  Route.reopen({
    console: service(),
    log: service(),

    actions: {
      error(error) {
        // TODO: In Fastboot every API request fails, thus aborting the route to login page.
        // if (this.isFastBoot) {
        //   return;
        // }

        // The request to the server was aborted
        // https://emberjs.com/api/ember-data/3.0/classes/DS.AbortError
        if (error instanceof AbortError) {
          if (isProduction) {
            if (navigator.onLine) {
              this.log.error(
                'Route transition aborted. Looks like the production API is down.'
              );
              // TODO: Send direct message to Jan
            } else {
              this.log.error(
                'Route transition aborted. Looks like you are offline.'
              );
              // TODO: Notify user
            }
          } else if (isDevelopment) {
            this.log.error(
              'Route transition aborted. Looks like your local API is down.'
            );
          } else if (isTest) {
            this.log.error(
              'Route transition aborted. Looks like we did not hit Mirage.'
            );
          } else {
            this.log.error('Route transition aborted. This should never show.');
          }
        }
        if (error instanceof InvalidError) {
          // https://emberjs.com/api/ember-data/3.0/classes/DS.InvalidError
          // Ember Data expects a source/pointer
          this.log.error(
            `422 - This request is invalid. Reason: ${error.code} - ${error.detail}`
          );
        } else if (error instanceof UnauthorizedError) {
          this.log.error('401 - You are not authorised to make this request.');
          this.transitionTo('login');
        } else if (error instanceof ForbiddenError) {
          this.log.error('403 - You are not allowed to make this request.');
        } else if (error instanceof NotFoundError) {
          this.log.error('404 - The back-end does not know this route.');
        } else if (error instanceof ConflictError) {
          this.log.error('409 - The request is conflicting.');
        } else if (error instanceof ServerError) {
          this.log.error('500 - The server is down!');
          // TODO: Warn Jan
        } else if (error instanceof TimeoutError) {
          this.log.error(
            '504 - The request timed out. Check your network and API load.'
          );
        } else {
          this.log.error('Unknown error');
          this.log.error(error);
          this.console.debug('DEBUG: Is Rails running?');
          this.console.debug('DEBUG: Do you have a model for this resource?');
          // Unknown error
          // debugger;
          // try {
          //   const parentRoute = relativeRoute(this.routeName, '../');
          //   this.transitionTo(parentRoute);
          // } catch (err) {
          //   this.transitionTo('index');
          // }
          // const firstError = error.errors[0];
          // this.log.error(firstError.status, firstError.code, firstError.detail);
        }
      }
    }
  });
}

export default {
  name: 'handle-route-errors',
  initialize
};

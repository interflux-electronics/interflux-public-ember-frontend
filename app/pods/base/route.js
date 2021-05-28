import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

// This route includes behaviour we need all routes to inherit.

export default class BaseRoute extends Route {
  @service auth;
  @service api;
  @service window;

  resetScroll = true;

  // This initializer makes sure each route transition resets the scroll position
  // of the viewport to the top. To prevent a route from resetting the scroll,
  // add the following property to routes:
  //
  // resetScroll = false;
  //
  @action
  activate() {
    super.activate();
    if (this.resetScroll) {
      this.window.scrollTo(0, 0);
    }
  }

  @action
  error(response) {
    console.error(`error() on "${this.routeName}" route`);

    this.api.logError(response);

    // Returning true allows the error to bubble up the route tree which triggers the error
    // templates to show
    return true;
  }
}

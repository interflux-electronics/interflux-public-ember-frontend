import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class BaseRoute extends Route {
  // These services are available in all routes which inherit BaseRoute.
  @service api;
  @service auth;
  @service fastboot;
  @service headData;
  @service header;
  @service router;
  @service store;
  @service translation;
  @service modal;
  @service window;

  get isNode() {
    return this.fastboot.isFastBoot;
  }

  // This initializer makes sure each route transition resets the scroll position
  // of the viewport to the top. Override ad hoc per route to prevent this behaviour.
  resetScroll = true;

  activate() {
    super.activate();
    if (this.resetScroll) {
      this.window.scrollTo(0, 0);
    }
    // On route transtion, close whatever modal was still open.
    // TODO: find a better way
    this.modal.showModal = false;
  }

  @action
  error(response) {
    console.error(`error() on "${this.routeName}" route`);

    // Interpret and log the error to console.
    this.api.logError(response);

    // Returning true allows the error to bubble up the route tree which triggers the error
    // templates to show
    return true;
  }
}

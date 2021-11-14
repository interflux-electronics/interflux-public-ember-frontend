import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class BaseRoute extends Route {
  // These services are available in all routes which inherit BaseRoute.
  @service api; // Knows how to talk to the backend.
  @service auth; // Manages user authentication.
  @service fastboot; // Ember's pre-serve renderer.
  @service headData; // Controls the <head> meta tags.
  @service header;
  @service router; // Ember's route service.
  @service store; // Ember's data store.
  @service translation; // Helps with translations.
  @service page; // Controls the <Page> component.
  @service modal; // Controls the <Modal> component.
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

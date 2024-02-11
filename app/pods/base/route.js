import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class BaseRoute extends Route {
  // These services are available to all routes which inherit BaseRoute.
  @service api; // Knows how to talk to the backend.
  @service auth; // Manages user authentication.
  @service cache; // For caching data and prevent reloads.
  @service fastboot; // Ember's pre-serve renderer.
  @service headData; // Controls the <head> meta tags.
  @service header; // To allow routes to make changes to request headers.
  @service modal; // For controlling the <Modal> component.
  @service page; // For controlling the <Page> component.
  @service performance; // For anything related to performance logging.
  @service router; // Ember's route service.
  @service seo; // For SEO concerns
  @service store; // Ember's data store.
  @service translation;
  @service uuid; // For generating UUIDs.
  @service window; // Shadow methods to prevent Node (Fastboot) from blowing up.

  @tracked cachedPayload;

  // All routes which inherit BaseRoute default to scrolling to the top upon
  // activation. To prevent this behaviour, add resetScroll = false to route.
  resetScroll = true;

  // True when this Ember app is run on client side in a browser (Javascript).
  get clientSide() {
    return !this.fastboot.isFastBoot;
  }

  // True when this Ember app is run on server side with Ember Fastboot (Node).
  get serverSide() {
    return this.fastboot.isFastBoot;
  }

  get serverSideRendered() {
    if (this.serverSide) {
      return false;
    }

    // In case Fastboot was successful at doing a server side render (ssr) and
    // serve then the "shoebox" passed down with the first HTML should contain
    // a boolean stating success.
    const shoebox = this.fastboot.shoebox.retrieve(this.routeName);

    // Next we store the result in the ssr service for other routes to consume.
    return shoebox?.serverSideRendered;
  }

  @action
  beforeModel() {
    // All routes default to instantly scrolling pages to the top.
    if (this.resetScroll) {
      this.window.scrollTo(0, 0);
    }

    // On route transtion, close whatever modal was still open.
    this.modal.showModal = false;

    // All routes which inherit the BaseRoute will cache the output of the model()
    // to avoid data being loaded more than once within a single browser session.
    const cache = this.cache.retrieve(this.routeName);

    if (cache) {
      this.cachedPayload = cache;
    } else {
      // In case Fastboot was successful at doing a server side render (ssr) we'll
      // create a "shoebox" which is a data payload passed down to the client via
      // the first HTML.
      if (this.serverSide) {
        this.fastboot.shoebox.put(this.routeName, { serverSideRendered: true });
      }
    }
  }

  afterModel(model) {
    if (this.clientSide && !this.cachedPayload) {
      this.cache.store(model, this.routeName);
    }
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

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

// This initializer makes sure each route transition resets the scroll position
// of the viewport to the top. To prevent a route from resetting the scroll,
// add the following property to routes:
//
// resetScroll = false;
//
export function initialize() {
  Route.reopen({
    window: service(),

    resetScroll: true,

    activate() {
      this._super();
      if (this.resetScroll) {
        this.window.scrollTo(0, 0);
      }
    }
  });
}

export default {
  initialize
};

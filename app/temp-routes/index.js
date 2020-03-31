import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    return RSVP.hash({
      heros: this.store.peekAll('hero').filterBy('group', this.routeName)
    });
  }
});

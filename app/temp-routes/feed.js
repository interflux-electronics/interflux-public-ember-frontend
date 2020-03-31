import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  errors: service(),
  log: service(),

  model() {
    return RSVP.hash({
      heros: this.store.peekAll('hero').filterBy('group', this.routeName),
      articles: this.store.findAll('article').catch(response => {
        this.errors.handle(response);
      })
    });
  }
});

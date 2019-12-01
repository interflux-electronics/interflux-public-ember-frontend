import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    return RSVP.hash({
      hero: this.store.peekAll('hero').findBy('route', 'products'),
      products: this.modelFor('products').products
    });
  }
});

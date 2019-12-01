import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(params) {
    debugger;
    return RSVP.hash({
      products: this.modelFor('products').products
    });
  }
});

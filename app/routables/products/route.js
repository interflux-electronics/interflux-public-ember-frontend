import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class ProductsRoute extends Route {
  @service store;

  model() {
    return hash({
      products: this.store.query('product', { include: ['image'].join(',') }),
      families: this.store.findAll('productFamily')
    });
  }
}

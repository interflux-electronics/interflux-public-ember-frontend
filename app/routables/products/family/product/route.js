import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class ProductsRoute extends Route {
  @service store;

  model(params) {
    const slug = params.product;

    return hash({
      product: this.store.findRecord('product', slug, {
        include: ['documents', 'images', 'features'].join(',')
      })
    });
  }
}

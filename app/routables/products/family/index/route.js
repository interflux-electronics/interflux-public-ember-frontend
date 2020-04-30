import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class ProductFamilyIndexRoute extends Route {
  @service store;

  model() {
    const slug = this.paramsFor('products.family').family;

    return hash({
      family: this.store.findRecord('productFamily', slug, {
        include: ['products', 'products.image', 'products.features'].join(',')
      })
    });
  }
}

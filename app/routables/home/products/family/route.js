import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProductFamilyRoute extends Route {
  @service store;

  model(params) {
    // const family = this.store
    //   .peekAll('productFamily')
    //   .findBy('slug', params.family);
    // const products = ;

    return {
      family: this.store.peekAll('productFamily').findBy('slug', params.family),
      products: this.store
        .peekAll('product')
        .filterBy('family.slug', params.family)
    };
  }

  afterModel(model) {
    if (!model.family) {
      console.warn('redirecting back to products page');
      this.transitionTo('home.products');
    }
  }
}

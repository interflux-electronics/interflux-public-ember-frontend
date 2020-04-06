import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProductFamilyRoute extends Route {
  @service store;

  model(params) {
    return {
      family: this.store.peekAll('productFamily').findBy('slug', params.family)
    };
  }

  afterModel(model) {
    if (!model.family) {
      console.warn('redirecting back to products page');
      this.transitionTo('products');
    }
  }
}

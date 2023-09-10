import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';
import { action } from '@ember/object';

export default class ProductsUseRoute extends BaseRoute {
  beforeModel(transition) {
    super.activate();

    const slug = transition.to.params.use_id;
    const use = this.store.peekRecord('use', slug);

    this.controllerFor('products').selectedUseId = slug;
    this.controllerFor('products.useLoading').title = use
      ? use.get('label')
      : 'Loading';
  }

  model(params) {
    return hash({
      productUses: this.store.query('product-use', {
        filter: { use: params.use_id },
        include: 'product,use'
      })
    });
  }

  afterModel(model) {
    super.activate();

    const use = model.productUses.mapBy('use').uniqBy('id')[0];
    const products = model.productUses.mapBy('product');
    const families = products.mapBy('mainFamily').uniqBy('id');

    this.controllerFor('products').selectedUseId = use.get('id');
    this.controllerFor('products').mainFamiliesSubset = families;
    this.controllerFor('products.use').title = use.get('forLabel');
    this.controllerFor('products.use').products = products;
    this.controllerFor('products.use').use = use;
  }

  @action
  willTransition() {
    this.controllerFor('products').selectedUseId = null;
    this.controllerFor('products').mainFamiliesSubset = null;
  }
}

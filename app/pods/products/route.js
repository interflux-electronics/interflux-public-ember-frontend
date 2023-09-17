import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class ProductsRouteRoute extends BaseRoute {
  activate() {
    super.activate();
    this.page.update({
      id: 'products',
      mainClasses: 'products'
    });
  }

  model() {
    return hash({
      products: this.store.findAll('product', {
        include: [
          'main_family',
          'sub_family',
          'product_uses',
          'uses',
          'product_qualities',
          'qualities'
        ].join(','),
        reload: true
      })
    });
  }

  afterModel(model) {
    const uses = model.products.mapBy('uses').flat().uniqBy('id');
    const mainFamilies = model.products.mapBy('mainFamily').uniqBy('id');

    this.controllerFor('products').setProperties({
      uses,
      mainFamilies
    });
  }
}

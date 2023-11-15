import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class ProductRoute extends BaseRoute {
  activate() {
    super.activate();
    this.page.update({
      id: 'product'
    });
  }

  model(params) {
    return hash({
      product: this.store.findRecord('product', params.product_id, {
        include: [
          'documents',
          'qualities',
          'uses',
          'product_qualities',
          'product_uses',
          'product_family',
          'product_family.product_family',
          'product_images',
          'product_images.image',
          'product_documents'
        ].join(','),
        reload: true
      })
    });
  }

  afterModel(model) {
    super.activate();
    const { product } = model;
    this.headData.update(this.seo.product(product));
    this.page.update({
      id: 'product',
      title: product.name,
      mainClasses: product.status,
      backRoute: 'products.family',
      backModel: product.mainFamily.get('id'),
      crumbs: [
        { label: 'Interflux', route: 'index' },
        { label: 'Products', route: 'products' },
        { label: product.name }
      ]
    });
  }

  // HACK: when navigating into a subset route, then out and back into another, the controller
  // of the first visit linger. With this hack we manually reset them.
  //
  // Documentation
  // https://api.emberjs.com/ember/3.24/classes/Route/methods?anchor=resetController
  //
  resetController(controller, isExiting, transition) {
    if (isExiting && transition.targetName !== 'error') {
      controller.set('chosenImage', null);
    }
  }
}

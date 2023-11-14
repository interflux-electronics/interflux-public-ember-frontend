import BaseRoute from 'interflux/pods/base/route';

export default class ProductsIndexRoute extends BaseRoute {
  beforeModel() {
    // Does not do anything...
    // super.activate();

    // Reset the scroll.
    this.window.scrollTo(0, 0);

    this.controllerFor('products').setProperties({
      selectedFamilyId: null,
      selectedUseId: null,
      usesLoading: false,
      familiesLoading: false
    });

    this.controllerFor('products.indexLoading').setProperties({
      title: 'All products'
    });

    this.headData.update(this.seo.allProducts); // TODO: review
  }

  model() {
    return this.modelFor('products');
  }
}

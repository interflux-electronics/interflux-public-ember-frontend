import BaseRoute from 'interflux/pods/base/route';

export default class ProductsIndexRoute extends BaseRoute {
  beforeModel() {
    super.activate();

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

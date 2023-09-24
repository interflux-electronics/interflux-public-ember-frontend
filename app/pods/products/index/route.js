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

    this.headData.update(this.seo.allProducts);

    // TODO: inspect mobile
    // TODO: translate
    this.page.update({
      id: 'products-index',
      mainClasses: 'products'
      // title: 'Products', // TODO: translate
      // backRoute: 'index',
      // crumbs: [{ label: 'Interflux', route: 'index' }, { label: 'Products' }]
    });
  }

  model() {
    return this.modelFor('products');
  }
}

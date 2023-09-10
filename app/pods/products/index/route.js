import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class ProductsIndexRoute extends BaseRoute {
  beforeModel() {
    super.activate();

    this.controllerFor('products').selectedFamilyId = null;
    this.controllerFor('products').selectedUseId = null;
    this.controllerFor('products').usesLoading = false;
    this.controllerFor('products').familiesLoading = false;
    this.controllerFor('products.indexLoading').title = 'All products';

    // TODO
    this.headData.update(this.seo.products);
    this.page.update({
      id: 'products-index',
      mainClasses: 'products'
      // title: 'Products', // TODO: translate
      // backRoute: 'index',
      // crumbs: [{ label: 'Interflux', route: 'index' }, { label: 'Products' }]
    });
  }

  model() {
    return hash({
      products: this.store.findAll('product'),
      families: this.store.findAll('product-family'),
      uses: this.store.findAll('use')
    });
  }
}

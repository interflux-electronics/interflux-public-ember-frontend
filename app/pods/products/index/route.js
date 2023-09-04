import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class ProductsIndexRoute extends BaseRoute {
  beforeModel() {
    super.activate();

    // Show snappy loading state to user
    this.controllerFor('products').selectedFamily = null;
    this.controllerFor('products').selectedUse = null;
    this.controllerFor('products.indexLoading').title = 'All products';

    // Show snappy loading state to user
    this.headData.update(this.seo.products);
    this.page.update({
      id: 'products-index',
      title: 'Products', // TODO: translate
      mainClasses: 'products',
      backRoute: 'index',
      crumbs: [{ label: 'Interflux', route: 'index' }, { label: 'Products' }]
    });
  }

  model() {
    return hash({
      products: this.store.findAll('product'),
      families: this.modelFor('products').families,
      uses: this.modelFor('products').uses
    });
  }
}

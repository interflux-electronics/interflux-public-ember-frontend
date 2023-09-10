import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class ProductsIndexRoute extends BaseRoute {
  beforeModel() {
    super.activate();

    this.controllerFor('products').selectedFamily = null;
    this.controllerFor('products').selectedUse = null;
    this.controllerFor('products.indexLoading').title = 'All products';

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
      families: this.store.findAll('product-family'),
      uses: this.store.findAll('use')
    });
  }
}

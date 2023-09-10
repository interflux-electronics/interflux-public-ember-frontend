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
      products: this.store.findAll('product'),
      families: this.store.findAll('product-family'),
      uses: this.store.findAll('use')
    });
  }
}

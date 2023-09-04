import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class ProductsRouteRoute extends BaseRoute {
  model() {
    return hash({
      families: this.store.findAll('product-family'),
      uses: this.store.findAll('use')
    });
  }
}

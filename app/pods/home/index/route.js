import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class IndexRoute extends BaseRoute {
  model() {
    return hash({
      products: this.store.findAll('product'),
      families: this.store.findAll('product-family')
    });
  }
}

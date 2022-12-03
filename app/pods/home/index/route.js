import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class IndexRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'homepage',
      title: 'Interflux'
    });
  }

  model() {
    return hash({
      products: this.store.findAll('product'),
      families: this.store.findAll('product-family')
      // error: new Promise((resolve, reject) => setTimeout(reject, 1 * 1000))
      // delay: new Promise((resolve) => setTimeout(resolve, 3 * 1000))
    });
  }
}

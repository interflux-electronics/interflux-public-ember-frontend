import BaseRoute from 'interflux/pods/base/route';

export default class ProductsErrorRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'products-error',
      title: 'Whoops'
    });
  }
}

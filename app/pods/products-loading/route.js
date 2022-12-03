import BaseRoute from 'interflux/pods/base/route';

export default class ProductsLoadingRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'products-loading',
      title: 'Loading products ...'
    });
  }
}

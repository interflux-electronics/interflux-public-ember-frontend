import BaseRoute from 'interflux/pods/base/route';

export default class ProductsLoadingRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.products);
    this.page.update({
      id: 'products-loading',
      title: 'Loading products ...'
    });
  }
}

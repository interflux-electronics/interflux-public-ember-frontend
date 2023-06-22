import BaseRoute from 'interflux/pods/base/route';

export default class ProductsIndexErrorRoute extends BaseRoute {
  activate() {
    this.headData.update(this.seo.error);
    this.page.update({
      id: 'products-index-error',
      title: 'Whoops'
    });
  }
}

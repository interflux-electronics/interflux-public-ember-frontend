import BaseRoute from 'interflux/pods/base/route';

export default class ProductsErrorRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.error);
    this.page.update({
      id: 'products-error',
      title: 'Whoops',
      showError: true
    });
  }
}

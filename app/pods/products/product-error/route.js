import BaseRoute from 'interflux/pods/base/route';

export default class ProductErrorRoute extends BaseRoute {
  activate() {
    this.headData.update(this.seo.error);
    this.page.update({
      id: 'product-error',
      title: 'Whoops',
      showError: true
    });
  }
}

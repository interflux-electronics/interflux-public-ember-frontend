import BaseRoute from 'interflux/pods/base/route';

export default class ProductsIndexLoadingRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'products-index-loading',
      title: 'Loading ...',
      hash: [{ label: 'Interflux', route: 'index' }, { label: 'Products' }]
    });
  }
}

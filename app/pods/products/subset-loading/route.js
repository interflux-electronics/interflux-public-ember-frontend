import BaseRoute from 'interflux/pods/base/route';

export default class ProductsSubsetLoadingRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'products-subset-loading',
      title: 'Loading ...',
      hash: [{ label: 'Interflux', route: 'index' }, { label: 'Products' }]
    });
  }
}

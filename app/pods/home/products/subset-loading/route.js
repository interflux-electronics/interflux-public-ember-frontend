import BaseRoute from 'interflux/pods/base/route';

export default class ProductsSubsetLoadingRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'product-subset-loading',
      title: 'Loading ...',
      hash: [
        { label: 'Interflux', route: 'home' },
        { label: 'Products', route: 'home.products' },
        { label: 'Loading ...' }
      ]
    });
  }
}

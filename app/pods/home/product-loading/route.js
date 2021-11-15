import BaseRoute from 'interflux/pods/base/route';

export default class ProductLoadingRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'product-loading',
      title: 'Loading ...',
      hash: [
        { label: 'Interflux', route: 'home' },
        { label: 'Products', route: 'home.products' },
        { label: 'Loading ...' }
      ]
    });
  }
}

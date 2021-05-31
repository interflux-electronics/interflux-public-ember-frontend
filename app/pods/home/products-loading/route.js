import BaseRoute from 'interflux/pods/base/route';

export default class ProductsLoadingRoute extends BaseRoute {
  activate() {
    super.activate();
    this.header.title = 'Loading...';
    this.header.crumbs = [
      { label: 'Interflux', route: 'home' },
      { label: 'Products' }
    ];
  }
}

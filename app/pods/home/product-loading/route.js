import BaseRoute from 'interflux/pods/base/route';

export default class ProductLoadingRoute extends BaseRoute {
  activate() {
    super.activate();
    this.header.title = 'Loading...';
    this.header.crumbs = [
      { label: 'Interflux', route: 'home' },
      { label: 'Products', route: 'home.products' },
      { label: 'Loading ...' }
    ];
  }
}

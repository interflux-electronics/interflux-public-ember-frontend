import BaseRoute from 'interflux/pods/base/route';

export default class ProductsErrorRoute extends BaseRoute {
  activate() {
    super.activate();
    this.header.title = 'Whoops';
    this.header.crumbs = [
      { label: 'Interflux', route: 'home' },
      { label: 'Whoops' }
    ];
  }
}

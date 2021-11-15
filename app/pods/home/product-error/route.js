import BaseRoute from 'interflux/pods/base/route';

export default class ProductErrorRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'product-error',
      title: 'Whoops',
      crumbs: [
        { label: 'Interflux', route: 'home' },
        { label: 'Products', route: 'home.products' },
        { label: 'Whoops', route: 'home.products' }
      ]
    });
  }
}

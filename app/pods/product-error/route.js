import BaseRoute from 'interflux/pods/base/route';

export default class ProductErrorRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'product-error',
      title: 'Whoops',
      crumbs: [
        { label: 'Interflux', route: 'index' },
        { label: 'Products', route: 'products' },
        { label: 'Whoops', route: 'products' }
      ]
    });
  }
}

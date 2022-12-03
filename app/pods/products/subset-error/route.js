import BaseRoute from 'interflux/pods/base/route';

export default class ProductsSubsetErrorRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'product-subset-error',
      title: 'Whoops',
      crumbs: [{ label: 'Interflux', route: 'index' }, { label: 'Products' }]
    });
  }
}

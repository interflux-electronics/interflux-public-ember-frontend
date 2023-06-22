import BaseRoute from 'interflux/pods/base/route';

export default class ProductsSubsetErrorRoute extends BaseRoute {
  activate() {
    this.headData.update(this.seo.error);
    this.page.update({
      id: 'products-subset-error',
      title: 'Whoops',
      crumbs: [{ label: 'Interflux', route: 'index' }, { label: 'Products' }]
    });
  }
}

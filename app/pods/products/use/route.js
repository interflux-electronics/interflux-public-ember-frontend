import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';
import { action } from '@ember/object';

export default class ProductsUseRoute extends BaseRoute {
  beforeModel(transition) {
    super.activate();

    const slug = transition.to.params.use_id;
    const use = this.store.peekRecord('use', slug);

    this.controllerFor('products').selectedUseId = slug;
    this.controllerFor('products').familiesLoading = true;
    this.controllerFor('products').familiesSubset = null;

    this.controllerFor('products.useLoading').title = use
      ? use.get('label')
      : 'Loading';

    // TODO
    // this.headData.update(this.seo.products);
    this.page.update({
      id: 'products-use',
      mainClasses: 'products'
      // title: 'Products', // TODO: translate
      // backRoute: 'index',
      // crumbs: [{ label: 'Interflux', route: 'index' }, { label: 'Products' }]
    });
  }

  model(params) {
    return hash({
      productUses: this.store.query('product-use', {
        filter: { use: params.use_id },
        include: 'product,use'
      })
    });
  }

  afterModel(model) {
    super.activate();

    const use = model.productUses.mapBy('use').uniqBy('id')[0];
    const products = model.productUses.mapBy('product');
    const families = products.mapBy('mainFamily').uniqBy('id');

    this.controllerFor('products').selectedUseId = use.get('id');
    this.controllerFor('products').familiesSubset = families;
    this.controllerFor('products').familiesLoading = false;
    this.controllerFor('products.use').title = use.get('forLabel');
    this.controllerFor('products.use').products = products;
    this.controllerFor('products.use').use = use;
  }

  @action
  willTransition() {
    this.controllerFor('products').selectedUseId = null;
    this.controllerFor('products').familiesSubset = null;
    this.controllerFor('products').familiesLoading = false;
  }
}

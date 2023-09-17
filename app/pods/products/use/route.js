import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';
import { action } from '@ember/object';

export default class ProductsUseRoute extends BaseRoute {
  beforeModel(transition) {
    super.activate();

    const slug = transition.to.params.use_id;
    const use = this.store.peekRecord('use', slug);

    if (!use) {
      return this.router.transitionTo('products');
    }

    this.controllerFor('products').setProperties({
      selectedUseId: slug,
      familiesLoading: true,
      familiesSubset: null
    });

    this.controllerFor('products.useLoading').setProperties({
      title: use ? `Products for ${use.get('name')}` : 'Loading'
    });

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
      use: this.store.findRecord('use', params.use_id, {
        include: ['products'].join(','),
        reload: true // prevents immediate resolve
      })
    });
  }

  afterModel(model) {
    super.activate();

    const use = model.use;
    const products = use.products;
    const families = products.mapBy('mainFamily').uniqBy('id');

    this.controllerFor('products').setProperties({
      selectedUseId: use.get('id'),
      familiesSubset: families,
      familiesLoading: false
    });

    this.controllerFor('products.use').setProperties({
      title: `Products for ${use.get('name')}`,
      products: products,
      use: use
    });
  }

  @action
  willTransition() {
    this.controllerFor('products').setProperties({
      selectedUseId: null,
      familiesSubset: null,
      familiesLoading: false
    });
  }
}

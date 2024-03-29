import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';
import { action } from '@ember/object';

export default class ProductsUseRoute extends BaseRoute {
  beforeModel(transition) {
    // Does not do anything...
    // super.activate();

    // Reset the scroll.
    this.window.scrollTo(0, 0);

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

    const loading = this.translation.t('Loading ...', 'loading.1');

    this.controllerFor('products.useLoading').setProperties({
      title: use ? `Products for ${use.get('name')}` : loading
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
    const familiesSubset = products.mapBy('mainFamily').uniqBy('id');

    this.controllerFor('products').setProperties({
      selectedUseId: use.get('id'),
      familiesSubset,
      familiesLoading: false
    });

    const title = this.translation.t(
      `Products for ${use.get('name')}`,
      'products.18',
      use.get('id')
    );

    this.controllerFor('products.use').setProperties({
      title,
      products,
      use
    });

    // TODO
    // this.headData.update(this.seo.products);
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

import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';
import { action } from '@ember/object';

export default class ProductsFamilyRoute extends BaseRoute {
  beforeModel(transition) {
    super.activate();

    const slug = transition.to.params.main_family_id;
    const family = this.store.peekRecord('product-family', slug);

    if (!family || family.get('isSubFamily')) {
      return this.router.transitionTo('products');
    }

    this.controllerFor('products').setProperties({
      selectedFamilyId: slug,
      usesSubset: null,
      usesLoading: true
    });

    const id = family.get('id');
    const title = this.translation.t(family.get('label'), `products.4`, id);

    this.controllerFor('products.familyLoading').setProperties({
      title
    });
  }

  model(params) {
    return hash({
      family: this.store.findRecord('product-family', params.main_family_id, {
        include: ['products'].join(','),
        reload: true
      })
    });
  }

  afterModel(model) {
    super.activate();

    const family = model.family;
    const id = family.get('id');
    const products = this.store
      .peekAll('product')
      .filterBy('mainFamily.id', id);
    const uses = products.mapBy('uses').flat().uniqBy('id');

    this.controllerFor('products').setProperties({
      selectedFamilyId: id,
      usesSubset: uses,
      usesLoading: false
    });

    const title = this.translation.t(family.get('label'), `products.4`, id);

    this.controllerFor('products.family').setProperties({
      title,
      family,
      products
    });

    // TODO
    // this.headData.update(this.seo.products);
  }

  @action
  willTransition() {
    this.controllerFor('products').setProperties({
      selectedFamilyId: null,
      usesSubset: null,
      usesLoading: false
    });
  }
}

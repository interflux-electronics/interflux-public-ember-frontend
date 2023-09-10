import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';
import { action } from '@ember/object';

export default class ProductsFamilyRoute extends BaseRoute {
  beforeModel(transition) {
    super.activate();

    const slug = transition.to.params.main_family_id;
    const family = this.store.peekRecord('product-family', slug);

    this.controllerFor('products').selectedFamilyId = slug;
    this.controllerFor('products').usesSubset = null;
    this.controllerFor('products').usesLoading = true;
    this.controllerFor('products.familyLoading').title = family
      ? family.get('label')
      : 'Loading';
  }

  model(params) {
    return hash({
      products: this.store.query('product', {
        filter: { main_family: params.main_family_id },
        include: ['main_family', 'sub_family', 'product_uses', 'uses'].join(',')
      })
    });
  }

  afterModel(model) {
    super.activate();

    const family = model.products.mapBy('mainFamily').uniqBy('id')[0];
    const uses = model.products.mapBy('uses').flat().uniqBy('id');

    this.controllerFor('products').selectedFamilyId = family.get('id');
    this.controllerFor('products').usesSubset = uses;
    this.controllerFor('products').usesLoading = false;
    this.controllerFor('products.family').family = family;

    // TODO
    // this.headData.update(this.seo.products);
    this.page.update({
      id: 'products-family',
      mainClasses: 'products'
      // title: 'Products', // TODO: translate
      // backRoute: 'index',
      // crumbs: [{ label: 'Interflux', route: 'index' }, { label: 'Products' }]
    });
  }

  @action
  willTransition() {
    this.controllerFor('products').selectedFamilyId = null;
    this.controllerFor('products').usesSubset = null;
    this.controllerFor('products').usesLoading = false;
  }
}

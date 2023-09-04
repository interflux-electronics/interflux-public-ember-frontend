import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';
import { action } from '@ember/object';

export default class ProductsFamilyRoute extends BaseRoute {
  beforeModel(transition) {
    super.activate();

    // const mainFamilyId = transition.to.params.main_family_id;

    // 1. Make sure the slug is a valid main family ID
    // const family = this.store.peekRecord('product-family', mainFamilyId);

    // if (!family) {
    //   console.warn(`no family found for "${mainFamilyId}"`);
    //   this.router.transitionTo('products');
    // }

    // 2. Make sure the family is a "main family"
    // if (!family.isMainFamily) {
    //   console.warn(`family is not main`);
    //   this.router.transitionTo('products');
    // }

    const selected = this.controllerFor('products').familyOptions.find(
      (option) => option.model === transition.to.params.main_family_id
    );

    console.log(selected);

    this.controllerFor('products').selectedFamily = selected;
    this.controllerFor('products.familyLoading').title = selected.label;

    // 4. Set SEO tags in the <head>
    // this.headData.update(this.seo.productsForFamily(family));

    // 5. Set mobile UI values
    // this.page.update({
    //   id: 'products-family',
    //   // title: family.label, // TODO: translate
    //   backRoute: 'products'
    // });
  }

  model() {
    const mainFamilyId = this.paramsFor('products.family').main_family_id;

    return hash({
      family: this.store.peekRecord('product-family', mainFamilyId),
      products: this.store.query('product', {
        filter: { main_family: mainFamilyId },
        include: ['product_uses', 'uses'].join(','),
        reload: true
      }),
      delay: this.window.delay(2000, true)
    });
  }

  @action
  willTransition() {
    this.controllerFor('products').selectedFamily = null;
  }
}

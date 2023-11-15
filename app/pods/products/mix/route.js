import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';
import { action } from '@ember/object';

export default class ProductsMixRoute extends BaseRoute {
  beforeModel(transition) {
    // Does not do anything...
    // super.activate();

    // Reset the scroll.
    this.window.scrollTo(0, 0);

    const params = transition.to.params;
    const familyId = params.main_family_id;
    const useId = params.use_id;
    const family = this.store.peekRecord('product-family', familyId);
    const use = this.store.peekRecord('use', useId);

    if (!use || !family || family.get('isSubFamily')) {
      return this.router.transitionTo('products');
    }

    this.controllerFor('products').setProperties({
      selectedFamilyId: familyId,
      selectedUseId: useId,
      familiesSubset: null,
      usesSubset: null
    });

    const title = this.translation.t(
      `${family.get('label')} for ${use.get('name')}`,
      'products.19',
      `${family.get('id')} for ${use.get('id')}`
    );

    this.controllerFor('products.mixLoading').setProperties({
      title
    });
  }

  model(params) {
    return hash({
      productUses: this.store.query('product-use', {
        filter: { use: params.use_id },
        include: 'product,use',
        reload: true
      })
    });
  }

  afterModel(model, transition) {
    super.activate();

    const params = transition.to.params;
    const familyId = params.main_family_id;
    const useId = params.use_id;
    const family = this.store.peekRecord('product-family', familyId);
    const use = this.store.peekRecord('use', useId);
    const title = this.translation.t(
      `${family.get('label')} for ${use.get('name')}`,
      'products.19',
      `${family.get('id')} for ${use.get('id')}`
    );
    const products = model.productUses
      .mapBy('product')
      .uniqBy('id')
      .filterBy('mainFamily.id', familyId);

    this.controllerFor('products.mix').setProperties({
      title,
      products
    });

    // TODO
    // this.headData.update(this.seo.products);
  }

  @action
  willTransition() {
    this.controllerFor('products').setProperties({
      selectedFamilyId: null,
      selectedUseId: null
    });
  }
}

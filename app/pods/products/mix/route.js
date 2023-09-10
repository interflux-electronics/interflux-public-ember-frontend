import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';
import { action } from '@ember/object';

export default class ProductsMixRoute extends BaseRoute {
  beforeModel(transition) {
    super.activate();

    const params = transition.to.params;
    const familyId = params.main_family_id;
    const useId = params.use_id;
    const family = this.store.peekRecord('product-family', familyId);
    const use = this.store.peekRecord('use', useId);

    this.controllerFor('products').selectedFamilyId = familyId;
    this.controllerFor('products').selectedUseId = useId;
    this.controllerFor('products').mainFamiliesSubset = null;
    this.controllerFor('products').usesSubset = null;
    this.controllerFor('products.mixLoading').title = family
      ? `${family.get('label')} for ${use.get('name')}`
      : 'Loading';
  }

  model(params) {
    return hash({
      productUses: this.store.query('product-use', {
        filter: { use: params.use_id },
        include: 'product,use'
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
    const title = `${family.get('label')} for ${use.get('name')}`;
    const products = model.productUses
      .mapBy('product')
      .uniqBy('id')
      .filterBy('mainFamily.id', familyId);

    this.controllerFor('products.mix').title = title;
    this.controllerFor('products.mix').products = products;
  }

  @action
  willTransition() {
    this.controllerFor('products').selectedFamilyId = null;
    this.controllerFor('products').selectedUseId = null;
  }
}

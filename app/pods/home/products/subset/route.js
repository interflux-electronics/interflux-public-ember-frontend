import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class ProductsSubsetRoute extends Route {
  @service cache;

  model(params) {
    const { slug } = params;

    const promises = this.cache.hasProductSubset
      ? {
          qualities: this.store.peekAll('quality'),
          productUses: this.store.peekAll('product-use'),
          productQualities: this.store.peekAll('product-quality')
        }
      : {
          qualities: this.store.findAll('quality'),
          productUses: this.store.findAll('product-use'),
          productQualities: this.store.findAll('product-quality')
        };

    if (slug.startsWith('for-')) {
      promises.use = this.store.peekRecord('use', slug.slice(4));
    } else {
      promises.family = this.store.peekRecord('productFamily', slug);
    }

    return hash(promises);
  }

  afterModel() {
    this.cache.hasProductSubset = true;
  }

  // HACK: when navigating into a subset route, then out and back into another, the controller
  // of the first visit linger. With this hack we manually reset them.
  //
  // Documentation
  // https://api.emberjs.com/ember/3.24/classes/Route/methods?anchor=resetController
  //
  // resetController(controller, isExiting, transition) {
  //   if (isExiting && transition.targetName !== 'error') {
  //     controller.set('groupBy', 'status');
  //     controller.set('subsets', this.statusSubsets);
  //     controller.set('familyHideList', []);
  //     controller.set('useHideList', []);
  //     controller.set('qualityHideList ', []);
  //   }
  // }
}

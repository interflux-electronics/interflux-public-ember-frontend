import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

export default class ProductFamilyIndexRoute extends Route {
  @service store;
  @service load;

  model() {
    const slug = this.paramsFor('products.family').family;

    return hash({
      family: this.store.findRecord('productFamily', slug, {
        include: ['products', 'products.image', 'products.features'].join(',')
      }),
      delay: new Promise(resolve => {
        later(function() {
          resolve(true);
        }, 2000);
      })
    });
  }

  @action
  loading(transition) {
    const start = new Date();
    console.log(`loading ${this.load.route}...`);
    this.load.show = true;
    this.load.route = 'family';
    transition.promise.finally(() => {
      const end = new Date();
      const ms = end - start;
      console.log(`done! ${ms}ms`);
      this.load.show = false;
    });

    return true;
  }
}

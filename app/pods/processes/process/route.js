import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
// import { action } from '@ember/object';
import { later } from '@ember/runloop';

export default class ProcessRoute extends Route {
  @service store;
  @service load;

  model(params) {
    const slug = params.process;

    return hash({
      products: this.modelFor('processes').products,
      processes: this.modelFor('processes').processes,
      process: this.store.findRecord('feature', slug, {
        include: ['products', 'products.image'].join(',')
      }),
      delay: new Promise(resolve => {
        later(function() {
          resolve(true);
        }, 1);
      })
    });
  }

  // @action
  // loading(transition) {
  //   const start = new Date();
  //   console.log(`loading ${this.load.route}...`);
  //   this.load.show = true;
  //   this.load.route = 'product';
  //   transition.promise.finally(() => {
  //     const end = new Date();
  //     const ms = end - start;
  //     console.log(`done! ${ms}ms`);
  //     this.load.show = false;
  //   });
  //
  //   return true;
  // }
}

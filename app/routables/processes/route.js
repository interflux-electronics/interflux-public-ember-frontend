import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { action } from '@ember/object';

export default class ProcessesRoute extends Route {
  model() {
    return hash({
      products: this.store.findAll('product'),
      processes: this.store.query('feature', {
        filter: {
          category: 'process'
        }
      })
    });
  }

  @action
  loading(transition) {
    const start = new Date();
    console.log(`loading ${this.load.route}...`);
    this.load.show = true;
    this.load.route = 'product';
    transition.promise.finally(() => {
      const end = new Date();
      const ms = end - start;
      console.log(`done! ${ms}ms`);
      this.load.show = false;
    });

    return true;
  }
}

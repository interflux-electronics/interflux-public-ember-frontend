import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class ProductsIndexRoute extends Route {
  @service store;

  model() {
    return hash({
      families: this.store.peekAll('productFamily').sortBy('rank', 'namePlural')
    });
  }
}

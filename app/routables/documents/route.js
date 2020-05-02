import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class DocumentssRoute extends Route {
  @service store;

  model() {
    return hash({
      documents: this.store.findAll('document'),
      products: this.store.findAll('product'),
      categories: this.store.findAll('documentCategory')
    });
  }
}

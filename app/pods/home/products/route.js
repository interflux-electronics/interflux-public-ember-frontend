import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default class ProductsRoute extends Route {
  @service cache;

  model() {
    if (this.cache.hasProductIndex) {
      return {
        products: this.store.peekAll('product'),
        families: this.store.peekAll('productFamily'),
        uses: this.store.peekAll('use')
      };
    } else {
      return hash({
        products: this.store.findAll('product', {
          include: ['image'].join(',')
        }),
        families: this.store.findAll('productFamily', {
          include: ['images'].join(',')
        }),
        uses: this.store.findAll('use', {
          include: ['images'].join(',')
        })
      });
    }
  }

  afterModel() {
    this.cache.hasProductIndex = true;
  }
}

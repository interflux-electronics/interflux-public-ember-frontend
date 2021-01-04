import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default class ProductsIndexRoute extends Route {
  @service cache;

  model() {
    if (this.cache.hasPath(location.pathname)) {
      return hash({
        families: this.store.peekAll('productFamily'),
        uses: this.store.peekAll('use'),
        delay: new Promise(resolve => setTimeout(resolve, 100))
      });
    } else {
      return hash({
        families: this.store.findAll('productFamily', {
          include: ['images'].join(',')
        }),
        uses: this.store.findAll('use', {
          include: ['images'].join(',')
        })
        // delay: new Promise(resolve => setTimeout(resolve, 300000))
      });
    }
  }

  afterModel() {
    this.cache.addPath(location.pathname);
  }
}

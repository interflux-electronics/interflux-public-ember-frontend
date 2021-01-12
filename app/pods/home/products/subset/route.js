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
}

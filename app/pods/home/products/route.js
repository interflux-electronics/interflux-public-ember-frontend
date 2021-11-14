import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default class ProductsRoute extends BaseRoute {
  @service cache;

  model() {
    if (this.cache.hasProductsIndex) {
      return {
        products: this.store.peekAll('product'),
        families: this.store.peekAll('productFamily'),
        uses: this.store.peekAll('use'),
        qualities: this.store.peekAll('quality'),
        productUses: this.store.peekAll('product-use'),
        productQualities: this.store.peekAll('product-quality')
      };
    } else {
      return hash({
        products: this.store.findAll('product'),
        families: this.store.findAll('productFamily', {
          include: [
            'product_family_images',
            'product_family_images.image'
          ].join(',')
        }),
        uses: this.store.findAll('use', {
          include: ['use_images', 'use_images.image'].join(',')
        }),
        qualities: this.store.findAll('quality'),
        productUses: this.store.findAll('product-use'),
        productQualities: this.store.findAll('product-quality')
        // error: new Promise((resolve, reject) => setTimeout(reject, 1 * 1000))
        // delay: new Promise((resolve) => setTimeout(resolve, 3 * 1000))
      });
    }
  }

  afterModel() {
    this.cache.hasProductsIndex = true;
  }
}

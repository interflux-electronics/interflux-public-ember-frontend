import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class ProductsRoute extends BaseRoute {
  model() {
    return hash({
      products: this.cache.products || this.store.findAll('product'),
      families:
        this.cache.families ||
        this.store.findAll('productFamily', {
          include: [
            'product_family_images',
            'product_family_images.image'
          ].join(',')
        }),
      uses:
        this.cache.uses ||
        this.store.findAll('use', {
          include: ['use_images', 'use_images.image'].join(',')
        }),
      qualities: this.cache.qualities || this.store.findAll('quality'),
      productUses: this.cache.productUses || this.store.findAll('product-use'),
      productQualities:
        this.cache.productQualities || this.store.findAll('product-quality')
      // error: new Promise((resolve, reject) => setTimeout(reject, 1 * 1000))
      // delay: new Promise((resolve) => setTimeout(resolve, 3 * 1000))
    });
  }

  afterModel(model) {
    this.cache.products = model.products;
    this.cache.families = model.families;
    this.cache.uses = model.uses;
    this.cache.qualities = model.qualities;
    this.cache.productUses = model.productUses;
    this.cache.productQualities = model.productQualities;
  }
}

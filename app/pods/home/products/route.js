import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default class ProductsRoute extends Route {
  @service cache;
  @service headData;

  beforeModel() {
    this.headData.path = '/products';
    this.headData.title = `Products developed by Interflux`;
    this.headData.description =
      'Get an overview of all the products Interflux researches and develops: soldering fluxes, solder pastes, solder wire, solder alloys and more.';

    this.headData.imagePath = 'images/logos/something.png';
    this.headData.imageMime = 'image/jpeg';
    this.headData.imageWidth = '1200';
    this.headData.imageHeight = '600';
    this.headData.imageAlt = 'logo';
  }

  model() {
    if (this.cache.hasProductIndex) {
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
      });
    }
  }

  afterModel() {
    this.cache.hasProductIndex = true;
  }
}

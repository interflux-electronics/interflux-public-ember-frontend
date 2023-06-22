import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class ProductsIndexRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.products);
    this.page.update({
      id: 'products-index',
      title: 'Products',
      backRoute: 'index'
    });
  }

  model() {
    if (this.cachedPayload) {
      return this.cachedPayload;
    }

    const payload = {
      products: this.store.findAll('product', {
        include: [
          'image',
          'product_uses',
          'product_uses.image',
          'product_qualities'
        ].join(',')
      }),
      families: this.store.findAll('productFamily', {
        include: ['product_family_images', 'product_family_images.image'].join(
          ','
        )
      }),
      uses: this.store.findAll('use', {
        include: ['use_images', 'use_images.image'].join(',')
      }),
      qualities: this.store.findAll('quality')
    };

    // return this.serverSideRendered ? payload : hash(payload);

    return hash(payload);
  }
}

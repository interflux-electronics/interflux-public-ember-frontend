import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ProductsRoute extends Route {
  model() {
    return hash({
      products: this.store.findAll('product', {
        include: ['image'].join(',')
      }),
      families: this.store.findAll('productFamily', {
        include: ['images'].join(',')
      }),
      uses: this.store.findAll('use', {
        include: ['images'].join(',')
      }),
      qualities: this.store.findAll('quality'),
      productUses: this.store.findAll('product-use'),
      productQualities: this.store.findAll('product-quality')
      // delay: new Promise(resolve => setTimeout(resolve, 300000))
    });
  }
}

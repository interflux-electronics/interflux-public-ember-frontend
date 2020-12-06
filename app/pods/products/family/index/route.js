import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { action } from '@ember/object';

export default class ProductFamilyIndexRoute extends Route {
  model() {
    const slug = this.paramsFor('products.family').family;

    return hash({
      products: this.store.query('product', {
        include: ['image'].join(',')
      }),
      families: this.store.findAll('productFamily'),
      uses: this.store.findAll('use')
      // delay: new Promise(resolve => setTimeout(resolve, 3000))
    });
  }
}

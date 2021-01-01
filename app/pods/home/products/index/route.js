import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ProductsIndexRoute extends Route {
  model() {
    return hash({
      families: this.store.findAll('productFamily', {
        include: ['images'].join(',')
      }),
      uses: this.store.findAll('use', {
        include: ['images'].join(',')
      })
    });
  }
}

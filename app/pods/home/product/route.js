import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ProductRoute extends Route {
  model(params) {
    return hash({
      product: this.store.findRecord('product', params.id, {
        include: [
          'image',
          'documents',
          'qualities',
          'uses',
          'product_family',
          'product_images',
          'product_images.image',
          'product_qualities',
          'product_uses',
          'product_documents'
        ].join(','),
        reload: true
      })
      // delay: new Promise(resolve => setTimeout(resolve, 300000))
    });
  }
}

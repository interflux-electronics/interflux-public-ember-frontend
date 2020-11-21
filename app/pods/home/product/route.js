import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default class ProductRoute extends Route {
  model(params) {
    return hash({
      product: this.store.findRecord('product', params.id, {
        include: [
          'image',
          'documents',
          'documents.cdn_files',
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
    });
  }
}
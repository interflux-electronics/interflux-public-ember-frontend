import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class ProductsRoute extends Route {
  @service store;

  model(params) {
    const slug = params.product;

    return hash({
      product: this.store.findRecord('product', slug, {
        include: [
          'documents',
          'images'
          // 'documents.language',
          // 'product-family',
          // 'product-images',
          // 'product-images.image',
          // 'product-variants',
          // 'product-variants.container',
          // 'product-processes',
          // 'product-variant.container.image',
          // 'features',
          // 'related-articles',
          // 'related-products',
          // 'related-products.main-group'
        ].join(',')
      })
    });
    // return hash({
    //   product: this.store.queryRecord('product', {
    //     slug: params.product,
    //     include: [
    //       'documents',
    //       'images'
    //       // 'documents.language',
    //       // 'product-family',
    //       // 'product-images',
    //       // 'product-images.image',
    //       // 'product-variants',
    //       // 'product-variants.container',
    //       // 'product-processes',
    //       // 'product-variant.container.image',
    //       // 'features',
    //       // 'related-articles',
    //       // 'related-products',
    //       // 'related-products.main-group'
    //     ].join(',')
    //   })
    //   // product: this.store.find('product', params.uuid),
    //   // documents: this.store.query('productDocument', {
    //   //   filter: { 'product-id': params.uuid },
    //   //   include: 'document'
    //   // }),
    // });
  }
}

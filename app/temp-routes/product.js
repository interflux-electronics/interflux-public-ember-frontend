import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(params) {
    return RSVP.hash({
      product: this.store.queryRecord('product', {
        slug: params.slug
        // include: [
        //   'product-family',
        //   'product-images',
        //   'product-images.image',
        //   'product-variants',
        //   'product-variants.container',
        //   'product-processes'
        //   // 'product-variant.container.image',
        //   // 'features'
        //   // 'related-articles',
        //   // 'related-products',
        //   // 'related-products.main-group'
        // ].join(',')
      })
    });
  }
});

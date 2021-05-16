import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class ProductRoute extends Route {
  @service headData;

  model(params) {
    return hash({
      product: this.store.findRecord('product', params.id, {
        include: [
          'documents',
          'qualities',
          'uses',
          'product_qualities',
          'product_uses',
          'product_family',
          'product_images',
          'product_images.image',
          'product_documents'
        ].join(','),
        reload: true
      })
      // delay: new Promise(resolve => setTimeout(resolve, 300000))
    });
  }

  afterModel(model) {
    const product = model.product.name;
    const family =
      model.product.label || model.product.productFamily.get('nameSingle');

    this.headData.path = `product/${model.product.slug}`;
    this.headData.title = `Interflux ${product} ${family}`;
    this.headData.description = model.product.pitch.replace(/\*\*/g, '');

    this.headData.imagePath = 'https://...';
    this.headData.imageMime = 'image/jpeg';
    this.headData.imageWidth = '1200';
    this.headData.imageHeight = '600';
    this.headData.imageAlt = 'logo';
  }

  // HACK: when navigating into a subset route, then out and back into another, the controller
  // of the first visit linger. With this hack we manually reset them.
  //
  // Documentation
  // https://api.emberjs.com/ember/3.24/classes/Route/methods?anchor=resetController
  //
  resetController(controller, isExiting, transition) {
    if (isExiting && transition.targetName !== 'error') {
      controller.set('chosenImage', null);
    }
  }
}

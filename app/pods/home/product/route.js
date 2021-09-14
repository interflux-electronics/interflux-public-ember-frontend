import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class ProductRoute extends BaseRoute {
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
    const {
      id,
      name,
      familyLabel,
      pitch,
      avatarPath,
      avatarAlt,
      avatarCaption,
      avatarVariations
    } = model.product;

    this.headData.reset();
    this.headData.setProperties({
      title: `${name} ${familyLabel} – Interflux`,
      description: pitch ? pitch.replace(/\*\*/g, '') : '',
      canonicalPath: `product/${id}`,
      ogType: 'product'
    });
    this.headData.setImage({
      path: avatarPath,
      variations: avatarVariations,
      alt: [avatarAlt, avatarCaption].filter((x) => !!x).join(' ')
    });
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

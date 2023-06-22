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
    });
  }

  afterModel(model) {
    super.activate();

    const {
      id,
      name,
      status,
      familyLabel,
      pitch,
      avatarPath,
      avatarVariations,
      mainFamily
    } = model.product;

    if (!avatarVariations.split(',').includes('@1200x1200.jpg')) {
      console.warn('no image found at @1200x1200');
    }

    this.headData.update({
      canonicalPath: `/product/${id}`,
      title: this.translation.t(
        `${name} ${familyLabel} – Interflux Electronics`,
        `seo.5.${id}`
      ),
      description: this.translation.t(
        'See all the products we produce: soldering fluxes, solder pastes, solder wires, solder alloys, ... All the chemistry needed for soldering electronics.',
        `seo.6.${id}`
      ),
      ogImagePath: `/${avatarPath}@1200x1200.jpg`,
      ogImageAlt: this.translation.t(pitch, `seo.7.${id}`),
      ogImageWidth: '1200',
      ogImageHeight: '1200'
    });

    this.page.update({
      id: 'product',
      title: name,
      mainClasses: status,
      backRoute: 'products.subset',
      backModel: mainFamily.get('id'),
      crumbs: [
        { label: 'Interflux', route: 'index' },
        { label: 'Products', route: 'products' },
        { label: name }
      ]
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

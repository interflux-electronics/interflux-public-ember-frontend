import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
// import { hash } from 'rsvp';

export default class ProductsSubsetRoute extends Route {
  @service cache;
  @service headData;

  model(params) {
    const { slug } = params;

    // const promises = this.cache.hasProductSubset
    //   ? {
    //       qualities: this.store.peekAll('quality'),
    //       productUses: this.store.peekAll('product-use'),
    //       productQualities: this.store.peekAll('product-quality')
    //     }
    //   : {
    //       qualities: this.store.findAll('quality'),
    //       productUses: this.store.findAll('product-use'),
    //       productQualities: this.store.findAll('product-quality')
    //     };

    // if (slug.startsWith('for-')) {
    //   promises.use = this.store.peekRecord('use', slug.slice(4));
    // } else {
    //   promises.family = this.store.peekRecord('productFamily', slug);
    // }

    // promises.products = this.modelFor('home.products').products;
    // promises.families = this.modelFor('home.products').families;
    // promises.uses = this.modelFor('home.products').uses;
    // promises.slug = slug;

    // return hash(promises);

    const model = this.modelFor('home.products');

    if (slug.startsWith('for-')) {
      model.use = this.store.peekRecord('use', slug.slice(4));
    } else {
      model.family = this.store.peekRecord('productFamily', slug);
    }

    return model;
  }

  afterModel(model) {
    this.cache.hasProductSubset = true;

    this.headData.setProperties({
      path: '/products',
      title: 'Interflux Electronics - Soldering fluxes, pastes, wires, alloys',
      description:
        'We research and develop the chemistry you need for soldering electronics with high-reliability. Products: soldering fluxes, solder pastes, solder wires, solder alloys, fluxing systems, solder masks, tip tinners and more.',
      imagePath: '/images/logos/secondary-interflux-electronics-logo-1.png',
      imageMime: 'image/png',
      imageWidth: '3960',
      imageHeight: '1000',
      imageAlt: 'secondary Interflux Electronics logo 1'
    });
  }

  // HACK: when navigating into a subset route, then out and back into another, the controller
  // of the first visit linger. With this hack we manually reset them.
  //
  // Documentation
  // https://api.emberjs.com/ember/3.24/classes/Route/methods?anchor=resetController
  //
  // resetController(controller, isExiting, transition) {
  //   if (isExiting && transition.targetName !== 'error') {
  //     controller.set('groupBy', 'status');
  //     controller.set('subsets', this.statusSubsets);
  //     controller.set('familyHideList', []);
  //     controller.set('useHideList', []);
  //     controller.set('qualityHideList ', []);
  //   }
  // }
}

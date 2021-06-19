import BaseRoute from 'interflux/pods/base/route';

export default class ProductsSubsetRoute extends BaseRoute {
  model(params) {
    const { slug } = params;
    const model = this.modelFor('home.products');

    if (slug.startsWith('for-')) {
      model.use = this.store.peekRecord('use', slug.slice(4));
    } else {
      model.family = this.store.peekRecord('productFamily', slug);
    }

    return model;
  }

  afterModel(model) {
    const { use, family } = model;
    const pageTitle = use
      ? `Products for ${use.get('label')}`
      : family.get('label');

    this.headData.setProperties({
      path: `/products/${use ? use.forSlug : family.slug}`,
      title: `${pageTitle} | Interflux`,
      description: 'TODO',
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
  //     console.log('resetController');
  //     controller.set('family', null);
  //     controller.set('use', null);
  //     // controller.set('groupBy', 'status');
  //     // controller.set('subsets', this.statusSubsets);
  //     // controller.set('qualityHideList ', []);
  //   }
  // }
}

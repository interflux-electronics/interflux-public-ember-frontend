import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class ProductsSubsetRoute extends BaseRoute {
  model(params) {
    if (this.cachedPayload) {
      return this.cachedPayload;
    }

    const { slug } = params;
    const payload = {
      products: this.store.findAll('product', {
        include: [
          'image',
          'product_uses',
          'product_uses.image',
          'product_qualities'
        ].join(',')
      }),
      families: this.store.findAll('productFamily', {
        include: ['product_family_images', 'product_family_images.image'].join(
          ','
        )
      }),
      uses: this.store.findAll('use', {
        include: ['use_images', 'use_images.image'].join(',')
      }),
      qualities: this.store.findAll('quality'),
      use: slug.startsWith('for-')
        ? this.store.findRecord('use', slug.slice(4))
        : null,
      family: slug.startsWith('for-')
        ? null
        : this.store.findRecord('productFamily', slug)
    };

    // TODO: refactor subset route to make this work
    // return this.serverSideRendered ? payload : hash(payload);

    return hash(payload);
  }

  afterModel(model) {
    // HACK: temporary
    if (this.clientSide && !this.cachedPayload) {
      console.log(`cache | ${this.routeName} | storing ⚠️ |`, model);
      this.cache.store(model, 'products.index');
    }

    // HACK: temporary
    // super.activate();

    const { use, family } = model;

    const pageTitle = use
      ? `Products for ${use.get('label')}`
      : family.get('label');

    // this.headData.reset();
    this.headData.setProperties({
      title: `${pageTitle} – Interflux`,
      // description: 'TODO',
      canonicalPath: `/products/${use ? use.forSlug : family.slug}`,
      imagePath: '/images/logos/secondary-interflux-electronics-logo-1.png',
      imageWidth: '3960',
      imageHeight: '1000',
      imageAlt: 'secondary Interflux Electronics logo 1'
    });
    this.page.update({
      id: 'products-subset',
      title: pageTitle,
      backRoute: 'products',
      crumbs: [
        { label: 'Interflux', route: 'index' },
        { label: 'Products', route: 'products' },
        { label: pageTitle }
      ]
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

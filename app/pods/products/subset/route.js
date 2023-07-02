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
      this.cache.store(model, 'products.index');
    }

    // HACK: temporary
    // super.activate();

    const { use, family } = model;

    const products = use ? use.productsByRank : family.productsByRank;
    const list = products.mapBy('name').join(', ');

    const title = use
      ? `Products for ${use.get('label')}`
      : family.get('label');

    const description = use
      ? `See all the products Interflux Electronics produces for ${use}: ${list}`
      : `See all ${family.get(
          'label'
        )} Interflux Electronics produces: ${list}`;

    this.headData.update({
      canonicalPath: `/products/${use ? use.forSlug : family.slug}`,
      title: this.translation.t(`${title} – Interflux Electronics`, 'seo.23'),
      description: this.translation.t(description, 'seo.24')
      // ogImagePath: '/images/public/og/og-contact.jpg',
      // ogImageAlt: this.translation.t(
      //   'x',
      //   'seo.25'
      // ),
      // ogImageWidth: '1200',
      // ogImageHeight: '1200'
    });

    this.page.update({
      id: 'products-subset',
      title,
      backRoute: 'products',
      crumbs: [
        { label: 'Interflux', route: 'index' },
        { label: 'Products', route: 'products' },
        { label: title }
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

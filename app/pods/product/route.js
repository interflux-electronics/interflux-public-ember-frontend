import ENV from 'interflux/config/environment';
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

    const { product } = model;

    const seo = {
      canonicalPath: `/product/${product.id}`,
      title: this.translation.t(
        `${product.name} ${product.familyLabel} – Interflux Electronics`,
        `seo.5.${product.id}`
      ),
      description: this.translation.t(product.pitch, `seo.6.${product.id}`),
      microData: {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        sku: product.id,
        name: product.name,
        description: product.pitch,
        brand: {
          name: 'Interflux Electronics'
        }
      }
    };

    if (product.avatarVariations) {
      if (product.avatarVariations.split(',').includes('@1200x1200.jpg')) {
        seo.ogImagePath = `/${product.avatarPath}@1200x1200.jpg`;
        seo.ogImageAlt = this.translation.t(
          product.pitch,
          `seo.7.${product.id}`
        );
        seo.ogImageWidth = '1200';
        seo.ogImageHeight = '1200';
        seo.microData.image = [
          `${ENV.cdnHost}/${product.avatarPath}@1200x1200.jpg`
        ];
      } else {
        console.warn('no image found at @1200x1200');
      }
    }

    if (product.qualities) {
      seo.microData.review = {
        '@type': 'Review',
        name: 'Interflux review',
        author: {
          '@type': 'Person',
          name: 'Jan Werkhoven'
        },
        positiveNotes: {
          '@type': 'ItemList',
          itemListElement: product.qualities.map((quality, i) => {
            return {
              '@type': 'ListItem',
              position: i + 1,
              name: quality.get('text')
            };
          })
        }
      };
    }

    this.headData.update(seo);

    this.page.update({
      id: 'product',
      title: product.name,
      mainClasses: product.status,
      backRoute: 'products.subset',
      backModel: product.mainFamily.get('id'),
      crumbs: [
        { label: 'Interflux', route: 'index' },
        { label: 'Products', route: 'products' },
        { label: product.name }
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

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class ProductsSubsetRoute extends Route {
  @service store;

  model(params) {
    const { slug } = params;

    if (slug.startsWith('for-')) {
      console.debug('fetching use');

      return hash({
        use: this.store.findRecord('use', slug.slice(4), {
          include: ['products'].join(','),
          reload: true
        })
        // delay: new Promise(resolve => setTimeout(resolve, 1000))
      });
    }

    console.debug('fetching family');

    return hash({
      family: this.store.findRecord('productFamily', slug, {
        include: ['products'].join(','),
        reload: true
      })
      // delay: new Promise(resolve => setTimeout(resolve, 1000))
    });
  }
}

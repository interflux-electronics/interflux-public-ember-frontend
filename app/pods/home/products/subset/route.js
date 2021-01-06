import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProductsSubsetRoute extends Route {
  @service store;

  model(params) {
    const { slug } = params;

    if (slug.startsWith('for-')) {
      return {
        use: this.store.peekRecord('use', slug.slice(4))
      };
    }

    return {
      family: this.store.peekRecord('productFamily', slug)
    };
  }
}

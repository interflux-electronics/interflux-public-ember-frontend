import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class ProductsUseSelectedRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.products); // TODO
    this.page.update({
      id: 'products',
      title: 'Products', // TODO
      backRoute: 'index' // TODO
    });
  }

  model(params) {
    return hash({
      // use: this.store.findRecord('use', params.use_id, {
      //   // include: 'product_uses',
      //   include: 'product_uses,products,products.product_family',
      //   reload: true
      // })
      // delay: new Promise((resolve) => {
      //   setTimeout(resolve, 2000);
      // })
    });
  }
}

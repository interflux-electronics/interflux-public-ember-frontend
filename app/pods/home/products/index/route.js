import Route from '@ember/routing/route';

export default class ProductsIndexRoute extends Route {
  model() {
    return this.modelFor('home.products');
  }
}

import Route from '@ember/routing/route';

export default class ProductFamilyIndexRoute extends Route {
  model() {
    return this.modelFor('home.products.family');
  }
}

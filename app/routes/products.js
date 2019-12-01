import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      products: this.store.findAll('product'),
      families: this.store.findAll('product-family')
    };
  }
});

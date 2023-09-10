import EmberRouter from '@ember/routing/router';
import ENV from 'interflux/config/environment';

export default class Router extends EmberRouter {
  location = ENV.locationType;
  rootURL = ENV.rootURL;
}

Router.map(function () {
  // /products/                                            "All products" grouped by status
  // /products/LMPA-Q7                                     "LMPA-Q7"
  // /products/family/solder-pastes                        "Solder pastes"
  // /products/family/solder-pastes/for/stencil-printing   "Solder pastes for stencil printing"
  // /products/for/stencil-printing                        "For stencil printing"
  this.route('products', function () {
    this.route('family', { path: '/family/:main_family_id' });
    this.route('use', { path: '/for/:use_id' });
    this.route('mix', { path: '/family/:main_family_id/for/:use_id' });
  });
  this.route('product', { path: '/product/:product_id' });
  this.route('webinars', function () {
    this.route('watch', { path: '/:webinar' });
  });
  this.route('company');
  this.route('documents', function () {
    this.route('category', { path: '/:category' });
  });
  this.route('contact');
  this.route('partners', function () {
    this.route('map');
  });
  this.route('permalink', { path: '/QR/:code' });
  this.route('catchall', { path: '*:' });
});

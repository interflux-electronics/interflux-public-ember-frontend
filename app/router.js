import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

// interflux.com/en/products/soldering-fluxes/IF-2005M

Router.map(function() {
  // this.route('products', function() {
  //   this.route('family', { path: '/:product_family_slug' }, function() {
  //     this.route('product', { path: '/:product_slug' });
  //   });
  //
  //   // this.route('fluxes', { path: '/soldering-fluxes' });
  //   // this.route('pastes', { path: '/solder-pastes' });
  //   // this.route('wires', { path: '/solder-wires' });
  //   // this.route('alloys', { path: '/solder-alloys' });
  //   // this.route('auxiliaries');
  //   // this.route('fluxers');
  //
  //   // Applications
  //   this.route('wave', { path: '/for-wave-soldering' });
  //   this.route('selective', { path: '/for-selective-soldering' });
  //   this.route('reflow', { path: '/for-reflow-soldering' });
  //   this.route('hand', { path: '/for-hand-soldering' });
  //   this.route('conditioning', { path: '/for-conditioning' });
  //   this.route('cleaning', { path: '/for-cleaning' });
  // });
  this.route('products', function() {
    this.route('family', { path: '/:slug' });
  });
  this.route('product', { path: 'product/:slug' });
  this.route('academy');
  this.route('contact');
  this.route('feed');
});

export default Router;

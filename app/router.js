import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

// interflux.com/academy/defects/soldering-balls
// interflux.com/academy/quality/halide-free-soldering
// interflux.com/academy/methods/jet-fluxing
// interflux.com/academy/jargon/wetting
//
// interflux.com/contact/support/belgium/interflux-electronics/daniel-werkhoven
// interflux.com/contact/support/singapore/interflux-singapore/wim-van-riet
// interflux.com/contact/support/australia/oritech/roy
// interflux.com/contact/australia/orders/belgium/

Router.map(function() {
  this.route('products');
  this.route('orders');
  this.route('academy');
  this.route('contact');
});

export default Router;

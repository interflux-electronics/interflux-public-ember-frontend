import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('products');
  this.route('academy');
  this.route('contact');
  this.route('feed');
});

export default Router;

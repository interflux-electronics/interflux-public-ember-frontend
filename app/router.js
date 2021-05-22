import EmberRouter from '@ember/routing/router';
import config from 'interflux/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home', { path: '/:language' }, function () {
    this.route('product', { path: '/product/:id' });
    this.route('products', function () {
      this.route('subset', { path: '/:slug' });
    });
    this.route('company');
    this.route('documents', function () {
      this.route('category', { path: '/:category' });
    });
    this.route('contact');
    this.route('catchall', { path: '*:', resetNamespace: true });
  });

  this.route('error');
  this.route('loading');
  this.route('application-loading');
});

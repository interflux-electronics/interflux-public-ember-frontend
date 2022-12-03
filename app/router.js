import EmberRouter from '@ember/routing/router';
import config from 'interflux/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('product', { path: '/product/:id' });
  this.route('products', function () {
    this.route('subset', { path: '/:slug' });
  });
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
  this.route('catchall', { path: '*:' });
  this.route('error');
  this.route('loading');
  this.route('application-loading');
});

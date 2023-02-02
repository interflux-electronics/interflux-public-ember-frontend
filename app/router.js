import EmberRouter from '@ember/routing/router';
import ENV from 'interflux/config/environment';

export default class Router extends EmberRouter {
  location = ENV.locationType;
  rootURL = ENV.rootURL;
}

Router.map(function () {
  this.route('language', { path: `/:language` }, function () {
    this.route('product', { resetNamespace: true, path: `/product/:id` });
    this.route('products', { resetNamespace: true }, function () {
      this.route('subset', { path: '/:slug' });
    });
    this.route('webinars', { resetNamespace: true }, function () {
      this.route('watch', { path: '/:webinar' });
    });
    this.route('company', { resetNamespace: true });
    this.route('documents', { resetNamespace: true }, function () {
      this.route('category', { path: '/:category' });
    });
    this.route('contact', { resetNamespace: true });
    this.route('partners', { resetNamespace: true }, function () {
      this.route('map');
    });
    this.route('catchall', { path: '*:' });
  });
});

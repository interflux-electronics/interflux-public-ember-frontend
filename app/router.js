import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', { path: '/:language' }, function() {
    this.route('products', function() {
      this.route('family', { path: '/:family' }, function() {
        this.route('product', { path: '/:product' });
      });
    });
    this.route('articles', function() {
      this.route('article', { path: '/:article' });
    });
    this.route('documents');
  });
  this.route('catchall');
  this.route('error');
  this.route('loading');
});

export default Router;

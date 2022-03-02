import BaseRoute from 'interflux/pods/base/route';

export default class ContactMapErrorRoute extends BaseRoute {
  activate() {
    console.error('something went wrong, redirecting back to contact page');
    this.router.transitionTo('contact');
  }
}

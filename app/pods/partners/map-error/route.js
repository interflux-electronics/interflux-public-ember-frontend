import BaseRoute from 'interflux/pods/base/route';

export default class ContactMapErrorRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.error);
    console.error('something went wrong, redirecting back to contact page');
    this.router.transitionTo('contact');
  }
}

import BaseRoute from 'interflux/pods/base/route';

export default class ContactLoadingRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.contact());
    this.page.update({
      id: 'contact',
      title: 'Contact',
      backRoute: 'index',
      theme: 'blue overlap'
    });
  }
}

import BaseRoute from 'interflux/pods/base/route';

export default class ContactLoadingRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'contact-loading',
      title: 'Loading contacts ...'
    });
  }
}

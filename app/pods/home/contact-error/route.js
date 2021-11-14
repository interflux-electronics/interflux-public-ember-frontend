import BaseRoute from 'interflux/pods/base/route';

export default class ContactErrorRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'contact-error',
      title: 'Whoops'
    });
  }
}

import BaseRoute from 'interflux/pods/base/route';

export default class WebinarsErrorRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'webinars-error',
      title: 'Whoops'
    });
  }
}

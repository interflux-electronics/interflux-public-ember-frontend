import BaseRoute from 'interflux/pods/base/route';

export default class WebinarsLoadingRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'application-loading',
      title: 'Loading ...',
      theme: 'green overlap'
    });
  }
}

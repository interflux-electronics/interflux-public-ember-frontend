import BaseRoute from 'interflux/pods/base/route';

export default class WebinarsLoadingRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'webinars-loading',
      title: 'Loading ...'
    });
  }
}

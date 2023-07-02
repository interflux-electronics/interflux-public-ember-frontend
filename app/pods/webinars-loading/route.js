import BaseRoute from 'interflux/pods/base/route';

export default class WebinarsLoadingRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.webinars());
    this.page.update({
      id: 'webinars-loading',
      title: 'Loading ...',
      theme: 'green overlap'
    });
  }
}

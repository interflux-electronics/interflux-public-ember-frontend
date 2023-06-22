import BaseRoute from 'interflux/pods/base/route';

export default class WebinarsErrorRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.error);
    this.page.update({
      id: 'webinars-error',
      title: 'Whoops',
      theme: 'green',
      showError: true
    });
  }
}

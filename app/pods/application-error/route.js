import BaseRoute from 'interflux/pods/base/route';

export default class ApplicationErrorRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.notFound);
    this.page.update({
      id: 'application-error',
      title: 'Whoops',
      showError: true
    });
  }
}

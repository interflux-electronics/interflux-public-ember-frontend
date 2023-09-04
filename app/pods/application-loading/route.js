import BaseRoute from 'interflux/pods/base/route';

export default class ApplicationLoadingRoute extends BaseRoute {
  activate() {
    super.activate();
    this.page.update({
      id: 'application-loading',
      title: 'Loading ...',
      showLoading: true
    });
  }

  deactivate() {
    super.activate();
    this.page.update({
      showLoading: false
    });
  }
}

import BaseRoute from 'interflux/pods/base/route';

export default class HomepageErrorRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.error);
    this.page.update({
      id: 'homepage',
      title: 'Whoops',
      showError: true
    });
  }
}

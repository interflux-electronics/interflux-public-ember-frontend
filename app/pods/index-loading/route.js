import BaseRoute from 'interflux/pods/base/route';

export default class HomepageLoadingRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.homepage());
    this.page.update({
      id: 'homepage',
      title: 'Interflux'
    });
  }
}

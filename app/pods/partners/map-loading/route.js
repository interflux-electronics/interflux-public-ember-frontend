import BaseRoute from 'interflux/pods/base/route';

export default class ContactLoadingRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.map);
    this.page.update({
      showHeader: false,
      showFooter: false
    });
  }
}

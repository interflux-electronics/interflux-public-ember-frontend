import BaseRoute from 'interflux/pods/base/route';

export default class ContactLoadingRoute extends BaseRoute {
  activate() {
    this.headData.setProperties({
      loadMapBox: true
    });
    this.page.update({
      showHeader: false,
      showFooter: false
    });
  }
}

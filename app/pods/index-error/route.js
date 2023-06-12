import BaseRoute from 'interflux/pods/base/route';

export default class HomepageErrorRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'homepage',
      title: 'Whoops'
    });
  }
}

import BaseRoute from 'interflux/pods/base/route';

export default class IndexRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'homepage',
      title: 'Interflux'
    });
  }
}

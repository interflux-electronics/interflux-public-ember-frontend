import BaseRoute from 'interflux/pods/base/route';

export default class CatchallRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.error);
    this.page.update({
      id: 'catchall',
      title: 'Whoops'
    });
  }

  beforeModel(transition) {
    console.error('404 unknown route');

    if (this.serverSide) {
      const req = this.fastboot.request;
      console.error(`${req.method} ${req.path}`);
    }

    if (this.clientSide) {
      console.error(location.href);
      console.erro(transition);
    }
  }
}

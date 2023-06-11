import BaseRoute from 'interflux/pods/base/route';

export default class CatchallRoute extends BaseRoute {
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

  activate() {
    this.headData.reset();
    this.headData.setProperties({
      title: 'Sorry, there is no page here.',
      description: 'Sorry, there is no page here.'
    });
    this.page.update({
      id: 'catchall',
      title: 'Whoops'
    });
  }
}

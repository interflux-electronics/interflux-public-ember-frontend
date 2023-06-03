import BaseRoute from 'interflux/pods/base/route';

export default class CatchallRoute extends BaseRoute {
  beforeModel(transition) {
    console.warn('Unknown route');
    console.warn(transition);
    if (this.fastboot.isFastBoot) {
      console.warn(this.fastboot.request);
    } else {
      console.warn(location.href);
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

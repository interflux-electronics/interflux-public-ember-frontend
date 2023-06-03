import BaseRoute from 'interflux/pods/base/route';
import { inject as service } from '@ember/service';

export default class CatchallRoute extends BaseRoute {
  @service fastboot;

  beforeModel(transition) {
    console.warn('Unknown route');
    if (this.fastboot.isFastBoot) {
      console.warn(location.href);
      console.warn({ transition, location });
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

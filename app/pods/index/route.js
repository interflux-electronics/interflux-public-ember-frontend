import BaseRoute from 'interflux/pods/base/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends BaseRoute {
  @service router;
  @service fastboot;
  @service headData;

  get isFastBoot() {
    return this.fastboot.isFastBoot;
  }

  beforeModel() {
    this.headData.setProperties({
      path: '/',
      title: 'Interflux = chemistry + electronics + metallurgy',
      description:
        'Interflux researches & develop the chemistry needed for soldering electronics: soldering fluxes, solder pastes, solder wires, fluxing systems and more for wave soldering, selective, reflow, stencil printing, BGA rework, ...',
      imagePath: 'images/logos/secondary-interflux-electronics-logo-2.png',
      imageMime: 'image/png',
      imageWidth: '1000',
      imageHeight: '1000',
      imageAlt: 'Interflux Electronics logo'
    });

    // if (!this.isFastBoot) {
    //   this.router.transitionTo('home', 'en');
    // }
  }
}

import BaseRoute from 'interflux/pods/base/route';
import { inject as service } from '@ember/service';

export default class HomeRoute extends BaseRoute {
  @service headData;

  beforeModel() {
    this.headData.setProperties({
      path: '/products',
      title: 'Interflux Electronics - Soldering fluxes, pastes, wires, alloys',
      description:
        'We research and develop the chemistry you need for soldering electronics with high-reliability. Products: soldering fluxes, solder pastes, solder wires, solder alloys, fluxing systems, solder masks, tip tinners and more.',
      imagePath: '/images/logos/secondary-interflux-electronics-logo-1.png',
      imageMime: 'image/png',
      imageWidth: '3960',
      imageHeight: '1000',
      imageAlt: 'secondary Interflux Electronics logo 1'
    });
  }
}

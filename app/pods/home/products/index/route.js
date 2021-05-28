import BaseRoute from 'interflux/pods/base/route';
import { inject as service } from '@ember/service';

export default class ProductsIndexRoute extends BaseRoute {
  @service headData;

  model() {
    return this.modelFor('home.products');
  }

  beforeModel() {
    this.headData.setProperties({
      path: '/products',
      title: 'Products',
      description:
        'Soldering fluxes, solder pastes, solder wires, solder alloys, fluxing systems, solder masks, tip tinners and more. For wave soldering, selective soldering, reflow soldering, rework, repair, jetting, and more.',
      imagePath:
        '/images/processes/heros/selective-soldering-2-tall@1920x720.jpg',
      imageMime: 'image/jpeg',
      imageWidth: '1920',
      imageHeight: '720',
      imageAlt: 'selective soldering mini wave'
    });
  }
}

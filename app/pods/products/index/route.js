import BaseRoute from 'interflux/pods/base/route';

export default class ProductsIndexRoute extends BaseRoute {
  activate() {
    this.headData.reset();
    this.headData.setProperties({
      title: 'Products – Interflux',
      description:
        'Soldering fluxes, solder pastes, solder wires, solder alloys, fluxing systems, solder masks, tip tinners and more. For wave soldering, selective soldering, reflow soldering, rework, repair, jetting, and more.',
      canonicalPath: 'products',
      imagePath:
        '/images/processes/heros/selective-soldering-2-tall@1920x720.jpg',
      imageWidth: '1920',
      imageHeight: '720',
      imageAlt: 'selective soldering mini wave'
    });
    this.page.update({
      id: 'products-index',
      title: 'Products',
      backRoute: 'index'
    });
  }

  model() {
    return this.modelFor('products');
  }
}

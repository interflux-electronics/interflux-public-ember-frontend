import BaseRoute from 'interflux/pods/base/route';

export default class HomepageLoadingRoute extends BaseRoute {
  activate() {
    this.headData.reset();
    this.headData.setProperties({
      title: 'Interflux – soldering fluxes, pastes, wires & alloys',
      description:
        'We research and develop the chemistry you need for soldering electronics with high-reliability. Products: soldering fluxes, solder pastes, solder wires, solder alloys, fluxing systems, solder masks, tip tinners and more.',
      imagePath: '/images/logos/secondary-interflux-electronics-logo-1.png',
      imageWidth: '3960',
      imageHeight: '1000',
      imageAlt: 'secondary Interflux Electronics logo 1'
    });
    this.page.update({
      id: 'homepage',
      title: 'Interflux'
    });
  }
}

import BaseRoute from 'interflux/pods/base/route';

export default class IndexRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'homepage',
      title: 'Interflux'
    });
  }

  beforeModel() {
    // TODO: use router.urlFor to generate canoncialPath
    // https://api.emberjs.com/ember/3.27/classes/RouterService/methods/cacheFor?anchor=cacheFor
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
  }
}

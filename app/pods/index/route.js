import BaseRoute from 'interflux/pods/base/route';

export default class IndexRoute extends BaseRoute {
  beforeModel() {
    // TODO: use router.urlFor to generate canoncialPath
    // https://api.emberjs.com/ember/3.27/classes/RouterService/methods/cacheFor?anchor=cacheFor
    this.headData.reset();
    this.headData.setProperties({
      title: 'Interflux Electronics – chemistry + metallurgy + electronics',
      description: `We research and develop the chemistry you need for soldering electronics with high-reliability. Products: soldering fluxes, solder pastes, solder wires, solder alloys, fluxing systems, solder masks, tip tinners and more.`,
      imagePath: '/images/logos/secondary-interflux-electronics-logo-1.png',
      imageWidth: '3960',
      imageHeight: '1000',
      imageAlt: 'secondary Interflux Electronics logo 1'
    });
  }

  activate() {
    this.page.update({
      id: 'select-language',
      showHeader: false,
      showFooter: false
    });
    // Each time a visitor returns to the index route we reset the language.
    this.i18n.language = null;
  }
}

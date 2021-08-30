import BaseRoute from 'interflux/pods/base/route';

export default class HomeRoute extends BaseRoute {
  beforeModel() {
    this.headData.reset();
    this.headData.setProperties({
      title: 'Interflux – soldering fluxes, pastes, wires & alloys',
      description:
        'We research and develop the chemistry you need for soldering electronics with high-reliability. Products: soldering fluxes, solder pastes, solder wires, solder alloys, fluxing systems, solder masks, tip tinners and more.',
      canoncialPath: 'products',
      imagePath: '/images/logos/secondary-interflux-electronics-logo-1.png',
      imageWidth: '3960',
      imageHeight: '1000',
      imageAlt: 'secondary Interflux Electronics logo 1'
    });
  }

  model(params) {
    // Fastboot (Node) doesn't have localStorage and doesn't handle redirects well.
    if (this.isNode) {
      return {};
    }

    const routeLocale = params.locale;
    const routeLanguage = this.translation.languages.find(
      (l) => l.id === routeLocale
    );

    // Redirect invalid route locals to either the preffered language or the English homepage.
    if (!routeLanguage) {
      const userLocale = localStorage.getItem('preferred-language');
      const userLanguage = this.translation.languages.find(
        (l) => l.id === userLocale
      );
      const model = userLanguage ? userLocale : 'en';
      this.router.transitionTo('home', model);
    }
  }
}

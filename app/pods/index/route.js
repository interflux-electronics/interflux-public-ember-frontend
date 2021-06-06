import BaseRoute from 'interflux/pods/base/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends BaseRoute {
  @service router;
  @service translation;

  beforeModel() {
    // TEMPORARY: until translations are ready
    this.router.transitionTo('home', 'en');

    // this.headData.setProperties({
    //   path: '/',
    //   title: 'Interflux = chemistry + electronics + metallurgy',
    //   description:
    //     'Interflux researches & develop the chemistry needed for soldering electronics: soldering fluxes, solder pastes, solder wires, fluxing systems and more for wave soldering, selective, reflow, stencil printing, BGA rework, ...',
    //   imagePath: 'images/logos/secondary-interflux-electronics-logo-2.png',
    //   imageMime: 'image/png',
    //   imageWidth: '1000',
    //   imageHeight: '1000',
    //   imageAlt: 'Interflux Electronics logo'
    // });
    //
    // this.header.setProperties({
    //   title: 'Choose language'
    // });
    //
    // Fastboot (Node) doesn't have localStorage and doesn't handle redirects well.
    // if (!this.isNode) {
    //
    // const locale = localStorage.getItem('preferred-language');
    // const language = this.translation.languages.find((l) => l.id === locale);
    //
    // if (language) {
    //   // Skip the language page if user has previously selected a language.
    //   this.router.transitionTo('home', locale);
    // } else {
    //   // Clear localStorage if it contains an invalid locale.
    //   localStorage.removeItem('preferred-language');
    // }
    // }
  }
}

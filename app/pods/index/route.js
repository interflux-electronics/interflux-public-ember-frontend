import Route from '@ember/routing/route';
// import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  // @service headData;

  beforeModel() {
    // TODO: Once we remove the redirect, we need to set <head> meta tags
    // this.headData.setProperties({
    //   path: '/products',
    //   title: 'Products developed by Interflux',
    //   description:
    //     'Get an overview of all the products Interflux researches and develops: soldering fluxes, solder pastes, solder wire, solder alloys and more.',
    //   imagePath: 'images/logos/something.png',
    //   imageMime: 'image/jpeg',
    //   imageWidth: '1200',
    //   imageHeight: '600',
    //   imageAlt: 'logo'
    // });

    this.transitionTo('home', 'en');
  }
}

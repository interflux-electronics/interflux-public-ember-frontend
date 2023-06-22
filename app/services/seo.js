import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class SeoService extends Service {
  @service translation;

  get homepage() {
    return {
      canonicalPath: '/',
      title: 'Interflux Electronics',
      description: this.translation.t(
        'Interflux Electronics specialises in researching, developing and producing soldering materials for electronics manufacturers. Best known for soldering fluxes, solder pastes, solder wires and soldering alloys.',
        'seo.1'
      ),
      ogImagePath: '/images/public/og/og-homepage.jpg',
      ogImageAlt: 'Interflux Electronics',
      ogImageWidth: '1200',
      ogImageHeight: '630'
    };
  }

  get products() {
    return {
      canonicalPath: '/products',
      title: this.translation.t('Products', 'seo.2'),
      description: this.translation.t(
        'See all the products we produce: soldering fluxes, solder pastes, solder wires, solder alloys, ... All the chemistry needed for soldering electronics.',
        'seo.3'
      ),
      ogImagePath: '/images/public/og/og-products.jpg',
      ogImageAlt: this.translation.t(
        'Interflux Electronics soldering fluxes, solder pastes, solder wires and solder alloys',
        'seo.4'
      ),
      ogImageWidth: '1200',
      ogImageHeight: '630'
    };
  }

  // See product route
  //
  // get product() {
  //   return {
  //     canonicalPath: '/products',
  //     title: this.translation.t('Product', 'seo.5'),
  //     description: this.translation.t(
  //       'See all the products we produce: soldering fluxes, solder pastes, solder wires, solder alloys, ... All the chemistry needed for soldering electronics.',
  //       'seo.6'
  //     ),
  //     ogImagePath: '/images/public/og/og-products.jpg',
  //     ogImageAlt: this.translation.t(
  //       'Interflux Electronics soldering fluxes, solder pastes, solder wires and solder alloys',
  //       'seo.7'
  //     ),
  //     ogImageWidth: '1200',
  //     ogImageHeight: '630'
  //   };
  // }

  get webinars() {
    return {
      canonicalPath: '/webinars',
      title: this.translation.t('Webinars', 'seo.8'),
      description: this.translation.t(
        "See videos in which Steven Teliszewski's walks you through research and findings relevant for electronics manufacturers such as: chemical reliability, low melting point alloys, ...",
        'seo.9'
      ),
      ogImagePath: '/images/public/og/og-webinars.jpg',
      ogImageAlt: this.translation.t(
        'Interflux Electronics video webinars',
        'seo.10'
      ),
      ogImageWidth: '1200',
      ogImageHeight: '630'
    };
  }

  get company() {
    return {
      canonicalPath: '/company',
      title: this.translation.t('Company', 'seo.11'),
      description: this.translation.t(
        'Learn more about the values, history and people behind Interflux Electronics.',
        'seo.12'
      ),
      ogImagePath: '/images/public/og/og-company.jpg',
      ogImageAlt: this.translation.t(
        'Interflux Electronics headquarters in Belgium',
        'seo.13'
      ),
      ogImageWidth: '1200',
      ogImageHeight: '630'
    };
  }

  get documents() {
    return {
      canonicalPath: '/documents',
      title: this.translation.t('Documents', 'seo.14'),
      description: this.translation.t(
        'Request technical datasheets, MSDS, RoHS, REACH and other helpful documents.',
        'seo.15'
      ),
      ogImagePath: '/images/public/og/og-documents.jpg',
      ogImageAlt: this.translation.t(
        'Interflux Electronics documents',
        'seo.16'
      ),
      ogImageWidth: '1200',
      ogImageHeight: '630'
    };
  }

  get contact() {
    return {
      canonicalPath: '/contact',
      title: this.translation.t('Contact', 'seo.17'),
      description: this.translation.t(
        'Find the right person to talk to. The Interflux Network consists of 40 partners worldwide and is located in key regions for the electronics manufacturing industry.',
        'seo.18'
      ),
      ogImagePath: '/images/public/og/og-contact.jpg',
      ogImageAlt: this.translation.t(
        'Contact Interflux Electronics world wide',
        'seo.19'
      ),
      ogImageWidth: '1200',
      ogImageHeight: '630'
    };
  }

  // TODO: make this dynamic for every contact
  get map() {
    return {
      canonicalPath: '/partners/map',
      title: this.translation.t('Partners', 'seo.20'),
      description: this.translation.t(
        'Find the right person to talk to. The Interflux Network consists of 40 partners worldwide and is located in key regions for the electronics manufacturing industry.',
        'seo.21'
      ),
      ogImagePath: '/images/public/og/og-contact.jpg',
      ogImageAlt: this.translation.t(
        'Contact Interflux Electronics world wide',
        'seo.22'
      ),
      ogImageWidth: '1200',
      ogImageHeight: '630',
      loadMapBox: true // IMPORTANT
    };
  }

  // get productSubset() {
  //   return {
  //     canonicalPath: '/partners/map',
  //     title: this.translation.t('Partners', 'seo.23'),
  //     description: this.translation.t(
  //       'Find the right person to talk to. The Interflux Network consists of 40 partners worldwide and is located in key regions for the electronics manufacturing industry.',
  //       'seo.24'
  //     ),
  //     ogImagePath: '/images/public/og/og-contact.jpg',
  //     ogImageAlt: this.translation.t(
  //       'Contact Interflux Electronics world wide',
  //       'seo.25'
  //     ),
  //     ogImageWidth: '1200',
  //     ogImageHeight: '630'
  //   };
  // }

  get error() {
    return {
      canonicalPath: '/',
      title: this.translation.t('404 Not Found', 'seo.23'),
      description: this.translation.t('There is no page here.', 'seo.24')
    };
  }
}

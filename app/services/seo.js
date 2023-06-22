import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class SeoService extends Service {
  @service translation;

  get homepage() {
    return {
      canonicalPath: '/',
      title: 'Interflux Electronics',
      description:
        'Interflux Electronics specialises in researching, developing and producing soldering materials for electronics manufacturers. Best known for soldering fluxes, solder pastes, solder wires and soldering alloys.',
      ogType: 'website',
      ogImagePath: '/images/public/og/og-homepage.jpg',
      ogImageAlt: 'Interflux Electronics',
      ogImageWidth: '1200',
      ogImageHeight: '630'
    };
  }

  get products() {
    return {
      canonicalPath: '/products',
      title: 'Products',
      description:
        'See all the products we produce: soldering fluxes, solder pastes, solder wires, solder alloys, ... All the chemistry needed for soldering electronics.',
      ogType: 'website',
      ogImagePath: '/images/public/og/og-products.jpg',
      ogImageAlt:
        'Interflux Electronics soldering fluxes, solder pastes, solder wires and solder alloys',
      ogImageWidth: '1200',
      ogImageHeight: '630'
    };
  }

  get product() {
    return {
      canonicalPath: '/products',
      title: 'Products',
      description:
        'See all the products we produce: soldering fluxes, solder pastes, solder wires, solder alloys, ... All the chemistry needed for soldering electronics.',
      ogType: 'website',
      ogImagePath: '/images/public/og/og-products.jpg',
      ogImageAlt:
        'Interflux Electronics soldering fluxes, solder pastes, solder wires and solder alloys',
      ogImageWidth: '1200',
      ogImageHeight: '630'
    };
  }

  get webinars() {
    return {
      canonicalPath: '/webinars',
      title: 'Webinars',
      description:
        "See videos in which Steven Teliszewski's walks you through research and findings relevant for electronics manufacturers such as: chemical reliability, low melting point alloys, ...",
      ogType: 'website',
      ogImagePath: '/images/public/og/og-webinars.jpg',
      ogImageAlt: 'Interflux Electronics video webinars',
      ogImageWidth: '1200',
      ogImageHeight: '630'
    };
  }

  get company() {
    return {
      canonicalPath: '/company',
      title: 'Company',
      description:
        'Learn more about the values, history and people behind Interflux Electronics.',
      ogType: 'website',
      ogImagePath: '/images/public/og/og-company.jpg',
      ogImageAlt: 'Interflux Electronics headquarters in Belgium',
      ogImageWidth: '1200',
      ogImageHeight: '630'
    };
  }

  get documents() {
    return {
      canonicalPath: '/documents',
      title: 'Documents',
      description:
        'Request technical datasheets, MSDS, RoHS, REACH and other helpful documents.',
      ogType: 'website',
      ogImagePath: '/images/public/og/og-documents.jpg',
      ogImageAlt: 'Interflux Electronics documents',
      ogImageWidth: '1200',
      ogImageHeight: '630'
    };
  }

  get contact() {
    return {
      canonicalPath: '/contact',
      title: 'Contact',
      description:
        'Find the right person to talk to. The Interflux Network consists of 40 partners worldwide and is located in key regions for the electronics manufacturing industry.',
      ogType: 'website',
      ogImagePath: '/images/public/og/og-contact.jpg',
      ogImageAlt: 'Contact Interflux Electronics world wide',
      ogImageWidth: '1200',
      ogImageHeight: '630'
    };
  }

  // TODO: make this dynamic for every contact
  get map() {
    return {
      canonicalPath: '/contact',
      title: 'Contact',
      description:
        'Find the right person to talk to. The Interflux Network consists of 40 partners worldwide and is located in key regions for the electronics manufacturing industry.',
      ogType: 'website',
      ogImagePath: '/images/public/og/og-contact.jpg',
      ogImageAlt: 'Contact Interflux Electronics world wide',
      ogImageWidth: '1200',
      ogImageHeight: '630',
      loadMapBox: true // IMPORTANT
    };
  }

  get error() {
    return {
      canonicalPath: '/',
      title: '404 Not Found',
      description: 'There is no page here.'
    };
  }
}

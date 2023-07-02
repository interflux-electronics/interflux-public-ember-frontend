import ENV from 'interflux/config/environment';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

// TODO: use router.urlFor to generate canoncialPath
// https://api.emberjs.com/ember/3.27/classes/RouterService/methods/cacheFor?anchor=cacheFor

export default class HeadDataService extends Service {
  @service translation;

  // The main method every route will want to call update the SEO metadata tags.
  // Note that when you omit a property, it will be undefined and thus not rendered.
  update(args) {
    this.title = args.title;
    this.description = args.description;
    this.canonicalPath = args.canonicalPath;
    this.ogImagePath = args.ogImagePath;
    this.ogImageWidth = args.ogImageWidth;
    this.ogImageHeight = args.ogImageHeight;
    this.ogImageAlt = args.ogImageAlt;
    this.loadMapBox = args.loadMapBox;
    this.microData = args.microData;
  }

  // This is the text for <title> element, crucial for our SEO.
  // Make sure every route overrides the title!
  // These have to be unique per canonical route.
  @tracked title;

  // This is the text for <meta name="description">, important for our SEO.
  // Make sure every route overrides this description.
  // These have to be unique per canonical route.
  @tracked description;

  // Assign a canonical URL to avoid search engines from indexing multiple URLs
  // for the same page. Suppose the URL has params like ?sort=ascending or
  // ?layout=grid then bots see these as seperate URLs, seperate pages. By
  // setting a canonical URL we tell bots that these are one and the same page.
  // Also when working duplicate content across multiple domains (such as
  // staging environments or blogs / shops which scrape content), we can use
  // canonical URLs to declare 1 of the domains being the one and only which
  // search engines should recommend in their searches.
  @tracked canonicalPath;

  // The open graph type describes the content of the page.
  // Most commonly: website, product, article, place, ...
  // Documentation: https://ogp.me/#types
  @tracked ogType = 'website';

  // The language of the page
  @tracked ogLocale = ENV.locale;

  // The Open Graph images are meant to be shown in social media. There is no
  // consensus on which size this image should be. The most adopted seems
  // 1200 x 630 (1.9:1) for landscape images and 1200 x 1200 for square images.
  // https://iamturns.com/open-graph-image-size/
  @tracked ogImagePath; // without the CDN host
  @tracked ogImageWidth; // in pixels, omit px
  @tracked ogImageHeight; // in pixels, omit px
  @tracked ogImageAlt; // descriptive

  get canonicalURL() {
    if (!this.canonicalPath) {
      return null;
    }

    return `${ENV.publicHost}${this.canonicalPath}`;
  }

  get ogImageURL() {
    if (!this.ogImagePath) {
      return null;
    }

    return `${ENV.cdnHost}${this.ogImagePath}`;
  }

  // For debugging environments

  get environment() {
    return ENV.environment;
  }

  get gitBranch() {
    return ENV.gitBranch;
  }

  get gitRevision() {
    return ENV.gitRevision;
  }

  get buildTimestamp() {
    return ENV.buildTimestamp;
  }

  // For pages to optionally include Mapbox logic and styles.
  @tracked loadMapBox = false;

  // For rendering LD+JSON micro data
  // https://developers.google.com/search/docs/appearance/structured-data
  // https://developers.google.com/search/docs/appearance/structured-data/search-gallery
  @tracked microData;

  // The microdata for our company logo is added to every page.
  // https://developers.google.com/search/docs/appearance/structured-data/logo
  get combinedMicroData() {
    const routeData = this.microData || [];
    const staticData = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        url: 'https://interflux.com',
        name: 'Interflux Electronics',
        legalName: 'Interflux Electronics NV',
        logo: `${ENV.cdnHost}/images/logos/interflux-electronics-logo-blue.svg`,
        email: 'info@interflux.com',
        telephone: '+3292514959',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Eddastraat 51',
          addressLocality: 'Gent',
          addressRegion: 'Oost-Vlaanderen',
          postalCode: '9042',
          addressCountry: 'BE'
        },
        founder: {
          '@type': 'Person',
          givenName: 'Daniel',
          familyName: 'Werkhoven',
          jobTitle: 'Founder & CEO'
        },
        employee: [
          {
            '@type': 'Person',
            givenName: 'Steven',
            familyName: 'Teliszewski',
            jobTitle: 'Chief Operational Officer'
          },
          {
            '@type': 'Person',
            givenName: 'Annick',
            familyName: 'Peeters',
            jobTitle: 'Laboratory Manager - REACH Coordinator'
          }
        ],
        brand: [
          {
            '@type': 'Brand',
            name: 'Interflux',
            logo: `${ENV.cdnHost}/images/logos/interflux-electronics-logo-white-on-blue.svg`,
            description:
              'soldering flux, solder paste, solder wire and solder alloys for the electronics industry'
          },
          {
            '@type': 'Brand',
            name: 'LMPA-Q',
            logo: `${ENV.cdnHost}/images/logos/LMPA-Q-logo-orange-square.svg`,
            description: 'Low Melting Point Alloys'
          },
          {
            '@type': 'Brand',
            name: 'ICSF',
            description: 'jet fluxing systems'
          }
        ]
      }
    ];

    return JSON.stringify([...staticData, ...routeData], null, 4);
  }
}

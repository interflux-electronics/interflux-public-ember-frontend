import ENV from 'interflux/config/environment';
import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class SeoService extends Service {
  @service log;
  @service translation;

  homepage(events) {
    const data = {
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

    if (events) {
      data.microData = this.microDataEvents(events);
    }

    return data;
  }

  get allProducts() {
    return {
      canonicalPath: '/products',
      title: this.translation.t('All products', 'products.1'),
      description: this.translation.t(
        'We produce soldering fluxes, solder pastes, solder wires, solder alloys, fluxing systems and auxiliaries for soldering electronics.',
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

  // get products() {
  //   return {
  //     canonicalPath: '/products',
  //     title: this.translation.t('Products', 'seo.2'),
  //     description: this.translation.t(
  //       'See all the products we produce: soldering fluxes, solder pastes, solder wires, solder alloys, ... All the chemistry needed for soldering electronics.',
  //       'seo.3'
  //     ),
  //     ogImagePath: '/images/public/og/og-products.jpg',
  //     ogImageAlt: this.translation.t(
  //       'Interflux Electronics soldering fluxes, solder pastes, solder wires and solder alloys',
  //       'seo.4'
  //     ),
  //     ogImageWidth: '1200',
  //     ogImageHeight: '630'
  //   };
  // }

  productsForFamily(family) {
    return {
      canonicalPath: `/products/family/${family.id}`,
      title: family.namePlural, // TODO: translate
      description: this.translation.t(
        `See all ${family.namePlural} developed by Interflux Electronics.`,
        `seo.5.${family.id}`
      ),
      ogImagePath: '/images/public/og/og-products.jpg', // TODO: make images for all families
      ogImageAlt: this.translation.t(
        'Interflux Electronics soldering fluxes, solder pastes, solder wires and solder alloys', // TODO: describe image
        'seo.4'
      ),
      ogImageWidth: '1200',
      ogImageHeight: '630'
    };
  }

  product(product) {
    const familyLabel = this.translation.t(
      product.familyLabel,
      'product.1',
      product.id
    );

    const description = this.translation.t(
      product.pitch,
      'product.2',
      product.id
    );

    const data = {
      canonicalPath: `/product/${product.id}`,
      title: `${product.name} ${familyLabel} – Interflux Electronics`,
      description,
      microData: [
        {
          '@context': 'https://schema.org/',
          '@type': 'Product',
          sku: product.id,
          name: product.name,
          description,
          brand: {
            name: 'Interflux Electronics'
          }
        }
      ]
    };

    if (product.qualities) {
      data.microData[0].review = {
        '@type': 'Review',
        name: 'Interflux review',
        author: {
          '@type': 'Person',
          name: 'Jan Werkhoven'
        },
        positiveNotes: {
          '@type': 'ItemList',
          itemListElement: product.qualities.map((quality, i) => {
            return {
              '@type': 'ListItem',
              position: i + 1,
              name: quality.get('text')
            };
          })
        }
      };
    } else {
      this.log.warn(`no qualities on ${product.id}, thus no microdata`);
    }

    const ogImage = this.ogImage(product.avatarVariations);

    if (ogImage) {
      data.ogImagePath = `${ENV.cdnPath}/${product.avatarPath}@${ogImage.width}x${ogImage.height}.jpg`;
      data.ogImageAlt = description;
      data.ogImageWidth = ogImage.width;
      data.ogImageHeight = ogImage.height;
    } else {
      this.log.warn(`no ogImage for ${product.id}`);
    }

    const microDataImages = this.microDataImages(product.images);

    if (microDataImages.length) {
      data.microData[0].image = microDataImages;
    } else {
      this.log.warn(`no microDataImages for ${product.id}`);
    }

    return data;
  }

  webinars(webinars) {
    const data = {
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

    if (webinars) {
      data.microData = webinars.map((webinar) => {
        return {
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: webinar.title,
          description: webinar.topic,
          thumbnailUrl: webinar.image.get('allVariations'),
          uploadDate: webinar.isoStartDate,
          contentUrl: webinar.video.get('allVariations'),
          embedUrl: `https://interflux.com/webinars/${webinar.id}`
        };
      });
    }

    return data;
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

  contact(events) {
    const data = {
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

    if (events) {
      data.microData = this.microDataEvents(events);
    }

    return data;
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

  get error() {
    return {
      canonicalPath: '/',
      title: this.translation.t('404 Not Found', 'seo.23'),
      description: this.translation.t('There is no page here.', 'seo.24')
    };
  }

  // Finds the best image to serve the Open Graph protocol (social media)
  // The logic below searches through all image variations and find the JPG
  // which has a width of exact 1200 (or closest to).
  ogImage(variations) {
    const JPGs = variations.split(',').filter((x) => x.split('.')[1] === 'jpg');

    if (!JPGs.length) {
      return null;
    }

    const optimalWidth = 1200;
    const sizes = JPGs.map((x) => x.split('.')[0].replace('@', '')); // ['200x200','400x400']
    const distances = sizes.map((size) => {
      const width = size.split('x')[0];
      return width - optimalWidth;
    });
    const larger = distances.filter((d) => d >= 0);
    const smaller = distances.filter((d) => d < 0);
    const closestDistance = larger.length
      ? Math.min(...larger)
      : Math.max(...smaller);
    const optimalSize = sizes.find((size) => {
      return size.split('x')[0] - optimalWidth === closestDistance;
    });
    const width = optimalSize.split('x')[0];
    const height = optimalSize.split('x')[1];

    return { width, height };
  }

  // For the LD+JSON microdata we will list all the largest images we have.
  // This function returns for every image, it's largest PNG, JPG and WEBP.
  microDataImages(images) {
    if (!images || !images.length) {
      return null;
    }

    const PNGs = images.mapBy('widestPNG');
    const JPGs = images.mapBy('widestJPG');
    const WEBPs = images.mapBy('widestWEBP');

    return [...PNGs, ...JPGs, ...WEBPs];
  }

  // LD+JSON microdata for events
  // https://developers.google.com/search/docs/appearance/structured-data/event
  microDataEvents(events) {
    return events.map((event) => {
      const { name, description, city, country, startDate, endDate } = event;

      return {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name,
        description,
        startDate,
        endDate,
        location: {
          '@type': 'Place',
          name: `${city}, ${country.get('nameEnglish')}`,
          address: {
            '@type': 'PostalAddress',
            addressLocality: city,
            addressCountry: country.get('nameEnglish')
          }
        }
      };
    });
  }
}

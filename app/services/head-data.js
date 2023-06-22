import ENV from 'interflux/config/environment';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

// TODO: use router.urlFor to generate canoncialPath
// https://api.emberjs.com/ember/3.27/classes/RouterService/methods/cacheFor?anchor=cacheFor

export default class HeadDataService extends Service {
  @service translation;

  // The main method every route will want to call update the SEO metadata tags.
  update(args) {
    this.title = args.title;
    this.description = args.description;
    this.canonicalPath = args.canonicalPath;
    this.ogType = args.ogType;
    this.ogImagePath = args.ogImagePath;
    this.ogImageWidth = args.ogImageWidth;
    this.ogImageHeight = args.ogImageHeight;
    this.ogImageAlt = args.ogImageAlt;
    this.loadMapBox = args.loadMapBox;
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

  // Finds the JPG nearest and above the optimal width of 1200.
  setImage(params) {
    const { path, variations, alt } = params;

    if (!path || !variations || !alt) {
      return console.warn('setImage() missing param', path, variations, alt);
    }

    const JPGs = variations.split(',').filter((x) => x.split('.')[1] === 'jpg');

    if (!JPGs.length) {
      return console.warn('setImage() no JPGs');
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

    this.imagePath = `${path}@${width}x${height}.jpg`;
    this.imageWidth = width;
    this.imageHeight = height;
    this.imageAlt = alt;
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
}

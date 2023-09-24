import ENV from 'interflux/config/environment';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ResponsiveImageComponent extends Component {
  // @arg path;
  // @arg variations;
  // @arg caption;
  // @arg alt;

  @service browser;
  @service fastboot;
  @service window;

  get path() {
    return this.args.path;
  }

  get variations() {
    return this.args.variations;
  }

  get caption() {
    return this.args.caption;
  }

  get alt() {
    return this.args.alt;
  }

  get hasJPG() {
    return this.variations.includes('.jpg');
  }

  get hasWEBP() {
    return this.variations.includes('.webp');
  }

  get hasPNG() {
    return this.variations.includes('.png');
  }

  get hasSVG() {
    return this.variations.includes('.svg');
  }

  get hasSizes() {
    return this.variations.includes('@');
  }

  get JPGs() {
    return this.variations.split(',').filter((x) => x.split('.')[1] === 'jpg');
  }

  get WEBPs() {
    return this.variations.split(',').filter((x) => x.split('.')[1] === 'webp');
  }

  get PNGs() {
    return this.variations.split(',').filter((x) => x.split('.')[1] === 'webp');
  }

  get JPGsizes() {
    return this.JPGs.map((x) => x.split('.')[0].replace('@', ''));
  }

  get WEBPsizes() {
    return this.JPGs.map((x) => x.split('.')[0].replace('@', ''));
  }

  get PNGsizes() {
    return this.PNGs.map((x) => x.split('.')[0].replace('@', ''));
  }

  // PICTURE

  // When the <picture> element is inserted we register it for later use.
  @action
  onInsert(element) {
    this.imageElement = element;
  }

  // The <picture> element
  @tracked imageElement;

  // This component looks at the actual width the <picture> element and the screen density and
  // decideds which width is the smallest width, which still renders a sharp image.
  get optimalWidth() {
    if (this.fastboot.isFastBoot || !this.imageElement) {
      return 50;
    } else {
      const pixelRatio = this.window.devicePixelRatio();

      // if (this.path.includes('/IF-920/')) {
      //   debugger;
      // }

      return this.imageElement.offsetWidth * pixelRatio;
    }
  }

  // Returns the JPG size "200x200" which has a width above and closest to the optimal width.
  get closestJPGsize() {
    return this.closestSize(this.JPGsizes);
  }

  // Returns the WEBP size "200x200" which has a width above and closest to the optimal width.
  get closestWEBPsize() {
    return this.closestSize(this.WEBPsizes);
  }

  get largestPNG() {
    return this.largestSize(this.PNGsizes);
  }

  get largestJPG() {
    return this.largestSize(this.JPGsizes);
  }

  get largestWEBP() {
    return this.largestSize(this.WEBPsizes);
  }

  // Accepts and array of sizes "200x200".
  // Returns the one which is above and closest to the optimal width.
  // We filter out the size "original".
  closestSize(sizes) {
    const distances = sizes
      .filter((size) => /^\d{2,4}x\d{2,4}$/.test(size))
      .map((size) => {
        const width = size.split('x')[0];
        return width - this.optimalWidth;
      });

    const larger = distances.filter((d) => d >= 0);
    const smaller = distances.filter((d) => d < 0);

    const closestDistance = larger.length
      ? Math.min(...larger)
      : Math.max(...smaller);

    return sizes.find((size) => {
      const width = size.split('x')[0];
      return width - this.optimalWidth === closestDistance;
    });
  }

  largestSize(sizes) {
    const largestWidth = Math.max(...sizes.map((x) => x.split('x')[0]));

    return sizes.find((s) => s.split('x')[0] === largestWidth.toString());
  }

  @tracked status = 'loading'; // loading, error, invalid, done

  get showShimmer() {
    return this.status === 'loading' || this.status === 'error';
  }

  get orientation() {
    if (!this.picture) {
      return 'square'; // invalid icon is square
    }
    if (!this.variations) {
      return 'square'; // invalid icon is square
    }
    if (!this.closestJPGsize) {
      return 'no-jpg';
    }
    const size = this.closestJPGsize.split('x');
    const w = parseInt(size[0]);
    const h = parseInt(size[1]);
    if (w === h) {
      return 'square';
    }
    if (w > h) {
      return 'landscape';
    } else {
      return 'portrait';
    }
  }

  get img() {
    const { path, variations } = this;
    const { cdnHost } = ENV;

    if (!path) {
      return console.warn('no path');
    }
    if (!variations) {
      return console.warn('no variations', this.path);
    }

    // If SVG, render immediately for the are sizeless.
    if (this.hasSVG) {
      return {
        src: `${cdnHost}/${path}.svg`
      };
    }

    // If WEBP files exist and the browser supports them, then render WEBP instead of JPG.
    if (this.hasWEBP) {
      const size = this.closestWEBPsize;
      if (size) {
        return {
          src: `${cdnHost}/${path}@${size}.webp`,
          width: size.split('x')[0],
          height: size.split('x')[1]
        };
      } else {
        return {
          src: `${cdnHost}/${path}.jpg`
        };
      }
    }

    // If no WEBP exist or the browser does not support WEBP, then render the trusty old JPG.
    if (this.hasJPG) {
      const size = this.closestJPGsize;
      if (size) {
        return {
          src: `${ENV.cdnHost}/${path}@${size}.jpg`,
          width: size.split('x')[0],
          height: size.split('x')[1]
        };
      } else {
        return {
          src: `${ENV.cdnHost}/${path}.jpg`
        };
      }
    }

    // Image is neither SVG, WEBP or JPG?
    return {};
  }

  get src() {
    return this.img.src;
  }

  get width() {
    return this.img.width;
  }

  get height() {
    return this.img.height;
  }

  get bestResolution() {
    const { path } = this;
    const { cdnHost } = ENV;

    if (this.hasPNG) {
      const size = this.largestPNG;
      return `${cdnHost}/${path}@${size}.png`;
    }

    if (this.hasJPG) {
      const size = this.largestJPG;
      return `${cdnHost}/${path}@${size}.jpg`;
    }

    if (this.hasWEBP) {
      const size = this.largestWEBP;
      return `${cdnHost}/${path}@${size}.webp`;
    }

    return this.img.src;
  }

  @action
  onError() {
    console.error('<ResponsiveImage> threw error for', this.src);
    this.status = 'error';
  }

  @action
  onLoad() {
    this.status = 'done';
  }
}

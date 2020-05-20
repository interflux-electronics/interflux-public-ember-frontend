import ENV from 'interflux/config/environment';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { computed } from '@ember/object';

// TODO: write tests
//
// Note: The onload event doesn't always fire correctly when images are cached
// or served fast. Instead of using Ember template logic, we'll rely on vanilla
// DOM manipulation so we can set the onload function before we add the src.
//
// Resources:
// https://stackoverflow.com/questions/12354865/image-onload-event-and-browser-cache
// https://stackoverflow.com/questions/23657424/why-image-complete-property-always-return-true-even-if-there-is-no-src-tag

export default class ImageResponsiveComponent extends Component {
  @tracked status = 'loading'; // loading, error or done

  @action
  renderOptimalSize(picture) {
    if (!this.valid) {
      return;
    }
    const size = this.optimalSize(picture);
    const fragment = this.fragment(size);
    picture.appendChild(fragment);
  }

  // 1. Find th optimal size for <picture> width and screen pixeldensity
  optimalSize(picture) {
    const sizes = this.args.image.get('sizes');
    const pixelRatio = window.devicePixelRatio || 1;
    const optimalWidth = picture.offsetWidth * pixelRatio;
    const distances = sizes.map(size => {
      const width = size.split('x')[0];
      return width - optimalWidth;
    });

    const larger = distances.filter(d => d >= 0);
    const smaller = distances.filter(d => d < 0);

    const closestDistance = larger.length
      ? Math.min(...larger)
      : Math.max(...smaller);

    return sizes.find(size => {
      const width = size.split('x')[0];
      return width - optimalWidth === closestDistance;
    });
  }

  fragment(size) {
    // Before we add things to the DOM we'll append them to a fragment
    const fragment = document.createDocumentFragment();

    // Create <img> element
    const img = new Image();
    img.onload = () => {
      this.status = 'done';
    };
    img.onerror = () => {
      this.status = 'error';
      console.warn(
        '<ResponsiveImage> failed to load image',
        this.args.image.get('path')
      );
    };
    const path = this.args.image.get('path');
    const cdn = ENV['cdnHost'];
    img.src = `${cdn}/${path}@${size}.jpg`;
    img.width = size.split('x')[0];
    img.height = size.split('x')[1];
    img.alt = this.args.image.get('alt');
    fragment.append(img);

    // If WEBP is supported, create <source> element
    if (this.webp) {
      const source = document.createElement('source');
      source.type = 'image/webp';
      source.srcset = `${cdn}/${path}@${size}.webp`;
      fragment.prepend(source);
    }

    return fragment;
  }

  get webp() {
    return this.args.image.get('formats').includes('webp');
  }

  // Return true if all passed in params are valid for this component to function.
  // Note: Deconstructing args will throws errors if image is an Ember proxy.
  // const { sizes, formats, path } = image;
  // Instead use .get()
  get valid() {
    const image = this.args.image;

    if (!image) {
      console.warn('<ResponsiveImage> no @image passed down');
      this.status = 'error';
      return false;
    }

    const sizes = image.get('sizes');
    const formats = image.get('formats');
    const path = image.get('path');

    if (!sizes || !formats || !path) {
      console.warn(
        '<ResponsiveImage> @image does not have path, sizes or formats'
      );
      this.status = 'error';
      return false;
    }

    return true;
  }

  @computed('args.image')
  get orientation() {
    if (!this.valid) {
      return 'invalid';
    }
    const sizes = this.args.image.get('sizes');
    const size = sizes[0].split('x');
    const w = size[0];
    const h = size[1];
    if (w === h) {
      return 'square';
    }
    if (w > h) {
      return 'landscape';
    } else {
      return 'portrait';
    }
  }

  @computed('status')
  get showLoading() {
    return this.status === 'loading';
  }

  @computed('status')
  get showError() {
    return this.status === 'error';
  }

  @action
  onClick() {
    if (this.args.onClick) {
      this.args.onClick();
    }
  }
}

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// TODO: write tests

export default class ImageResponsiveComponent extends Component {
  @tracked foundOptimal = false;
  @tracked loading = true;
  @tracked error = false;
  @tracked optimalWidth;
  @tracked optimalHeight;

  // From the moment the <figure> element is inserted into the DOM, we know its
  // width and can then fire the findOptimalSize() action to find the image
  // with the smallest possible resolution which renders a sharp image. This
  // technique can dramatically reduce download times, especially on mobile.
  @action
  findOptimalSize(element) {
    const image = this.args.image;
    if (!image) {
      this.error = true;
      return;
    }

    // Throws errors with Ember proxy objects
    // const { sizes, formats, path } = image;
    // Instead use .get()
    const sizes = image.get('sizes');
    const formats = image.get('formats');
    const path = image.get('path');
    const valid = sizes && formats && path;

    if (!valid) {
      this.error = true;
      return;
    }

    const pixelRatio = window.devicePixelRatio || 1;
    const optimalWidth = element.offsetWidth * pixelRatio;

    const distances = sizes.map(size => {
      const width = size.split('x')[0];
      return width - optimalWidth;
    });

    const larger = distances.filter(d => d >= 0);
    const smaller = distances.filter(d => d < 0);

    const closestDistance = larger.length
      ? Math.min(...larger)
      : Math.max(...smaller);

    const closestSize = sizes.find(size => {
      const width = size.split('x')[0];
      return width - optimalWidth === closestDistance;
    });

    this.optimalWidth = closestSize.split('x')[0];
    this.optimalHeight = closestSize.split('x')[1];
    this.foundOptimal = true;
  }

  get webp() {
    return false;
    // TODO: first fix chroma issue with WEBP images
    // return this.args.image.get('formats').includes('webp');
  }

  @action
  onLoad() {
    this.loading = false;
    this.error = false;
  }

  @action
  onError() {
    this.loading = false;
    this.error = true;
    console.error('Failed to load image', this.args.image.path);
  }

  @action
  onClick() {
    if (this.args.onClick) {
      this.args.onClick();
    }
  }
}

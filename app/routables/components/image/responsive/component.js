import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { computed } from '@ember/object';

// TODO: write tests

export default class ImageResponsiveComponent extends Component {
  @tracked element; // the <figure> element
  @tracked status = 'loading'; // loading, error or done

  // On insert into the DOM, we register the <figure> element for later use
  @action
  register(element) {
    this.element = element;
  }

  // Return true if all passed in params are valid for this component to function.
  // Note: Deconstructing args will throws errors if image is an Ember proxy.
  // const { sizes, formats, path } = image;
  // Instead use .get()
  @computed('args.image')
  get valid() {
    const image = this.args.image;

    if (!image) {
      this.status = 'error';
      return false;
    }

    const sizes = image.get('sizes');
    const formats = image.get('formats');
    const path = image.get('path');

    if (!sizes || !formats || !path) {
      this.status = 'error';
      return false;
    }

    return true;
  }

  // Returns the smallest image size which still renders sharply.
  @computed('element', 'args.image')
  get optimal() {
    // Do not compute the optimal size until the <figure> component has been
    // inserted into the DOM. We need it to compute it's width in the DOM, as
    // defined by our responsive CSS. For as long the optimal size is unknown,
    // the loading spinner will be shown.
    if (!this.element) {
      return null;
    }

    // Each time a new
    if (!this.isLoading) {
      this.status = 'loading';
    }

    const sizes = this.args.image.get('sizes');
    const pixelRatio = window.devicePixelRatio || 1;
    const optimalWidth = this.element.offsetWidth * pixelRatio;

    const distances = sizes.map(size => {
      const width = size.split('x')[0];
      return width - optimalWidth;
    });

    const larger = distances.filter(d => d >= 0);
    const smaller = distances.filter(d => d < 0);

    const closestDistance = larger.length
      ? Math.min(...larger)
      : Math.max(...smaller);

    const optimalSize = sizes.find(size => {
      const width = size.split('x')[0];
      return width - optimalWidth === closestDistance;
    });

    return {
      width: optimalSize.split('x')[0],
      height: optimalSize.split('x')[1]
    };
  }

  // TODO: seed correct sizes in database
  get shape() {
    const image = this.args.image;
    if (!image) {
      return 'no-image';
    }
    const sizes = image.get('sizes');
    if (!sizes) {
      return 'no-sizes';
    }
    const size = sizes[0].split('x');
    const width = size[0];
    const height = size[1];
    if (width === height) {
      return 'square';
    } else if (width > height) {
      return 'landscape';
    } else {
      return 'portrait';
    }
  }

  // TODO: first fix chroma issue with WEBP images
  get webp() {
    return false;
    // return this.args.image.get('formats').includes('webp');
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
  onLoad() {
    this.status = 'done';
  }

  @action
  onError() {
    console.error('Failed to load image', this.args.image.path);
    this.status = 'error';
  }

  @action
  onClick() {
    if (this.args.onClick) {
      this.args.onClick();
    }
  }
}

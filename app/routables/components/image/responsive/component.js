import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// TODO: write tests

export default class ImageResponsiveComponent extends Component {
  @tracked loading = true;
  @tracked loadFailed = false;
  @tracked showImage = false;
  @tracked showError = false;
  @tracked optimalWidth;
  @tracked optimalHeight;

  get webp() {
    return false; // TODO: first fix chroma issue with WEBP images
    // return this.args.formats && this.args.formats.includes('webp');
  }

  @action
  didInsert(element) {
    this.computeOptimalSize(element);
  }

  // TODO: Stop watching
  // @action
  // willDestroy(element) {
  //   console.debug('<Image::Responsive> willDestroy()', { element });
  // }

  @action
  computeOptimalSize(element) {
    const sizes = this.args.sizes;
    const pixelRatio = window.devicePixelRatio || 1;
    const optimalWidth = element.offsetWidth * pixelRatio;

    const distances = sizes.map(size => {
      const width = size.split('x')[0];
      return width - optimalWidth;
    });

    const larger = distances.filter(d => d >= 0);
    const smaller = distances.filter(d => d < 0);

    const closestDistance = larger.length
      ? Math.max(...larger)
      : Math.max(...smaller);

    const closestSize = sizes.find(size => {
      const width = size.split('x')[0];
      return width - optimalWidth === closestDistance;
    });

    this.optimalHeight = closestSize.split('x')[0];
    this.optimalWidth = closestSize.split('x')[1];
    this.showImage = true;
  }

  @action
  onLoad() {
    // console.debug('<Image::Responsive> onLoad()');
    this.loading = false;
    this.loadFailed = false;
  }

  @action
  onError(error) {
    console.error('<Image::Responsive> onError()', { error });
    this.loading = false;
    this.loadFailed = true;
  }
}

import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProductController extends Controller {
  @tracked chosenImage = null;

  get avatar() {
    return this.model.product.image;
  }

  get firstImage() {
    const images = this.model.product.productImages;

    return images && images.length > 0 ? this.images.firstObject : null;
  }

  get heroImage() {
    return this.chosenImage
      ? this.chosenImage
      : this.avatar
      ? this.avatar
      : this.firstImage
      ? this.firstImage
      : null;
  }

  get images() {
    return this.model.product.productImages
      .filterBy('public', true)
      .sortBy('rank')
      .mapBy('image');
  }

  @action
  setHero(image) {
    this.chosenImage = image;
  }
}

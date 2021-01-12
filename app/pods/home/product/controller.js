import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProductController extends Controller {
  @tracked chosenImage = null;

  get heroImage() {
    return this.chosenImage || this.model.product.image;
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

  // HACK: for some reason the chosenImage remains set when navigating between products. The
  // solution is to reset this value on each insert.
  @action
  onInsert() {
    this.chosenImage = null;
  }
}

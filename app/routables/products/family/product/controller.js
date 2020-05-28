import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { computed } from '@ember/object';

export default class ProductsFamilyProductController extends Controller {
  @tracked chosenImage;

  @computed('chosenImage')
  get heroImage() {
    return this.chosenImage || this.model.product.avatar;
  }

  @action
  setHero(image) {
    this.chosenImage = image;
  }
}

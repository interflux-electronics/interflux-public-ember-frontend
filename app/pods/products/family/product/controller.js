import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { computed } from '@ember/object';

export default class ProductsFamilyProductController extends Controller {
  @tracked chosenImage = null;

  @computed('chosenImage', 'model.product.avatar.id')
  get heroImage() {
    return this.chosenImage || this.model.product.avatar;
  }

  @action
  setHero(image) {
    this.chosenImage = image;
  }
}

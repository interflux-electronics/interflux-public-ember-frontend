import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HomeIndexController extends Controller {
  @tracked imageLeft = 'image-1';
  @tracked imageRight = 'image-6';

  @action
  showImage(i) {
    if (i <= 5) {
      this.imageLeft = `image-${i}`;
    } else {
      this.imageRight = `image-${i}`;
    }
  }
}

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

// TODO: parallax the hero
// https://codepen.io/RenanB/pen/GZeBNg

export default class HomeIndexController extends Controller {
  @service media;

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

  @action
  showNextSection() {
    const top = document.getElementById('what-we-do').offsetTop;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  get popularProducts() {
    return this.model.products
      .filterBy('status', 'popular')
      .sortBy('mainFamily.rank');
  }

  get newProducts() {
    return this.model.products
      .filterBy('status', 'new')
      .sortBy('mainFamily.rank');
  }

  get yearCount() {
    const today = new Date();

    return today.getFullYear() - 1980;
  }
}

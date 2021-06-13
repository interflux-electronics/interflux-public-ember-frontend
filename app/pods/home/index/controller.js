import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

// TODO: parallax the hero
// https://codepen.io/RenanB/pen/GZeBNg

export default class HomeIndexController extends Controller {
  @service media;

  @tracked heroWord;
  @tracked imageLeft = 'image-1';
  @tracked imageRight = 'image-6';

  constructor() {
    super(...arguments);

    this.startHeroWordLoop();
  }

  async startHeroWordLoop() {
    // if (this.fastboot.isFastBoot) {
    //   return;
    // }

    const array = [
      'zero defects',
      'lead-free',
      'high reliability',
      'no residue!',
      'low temperature',
      'VOC-free',
      'halide-free'
    ].sort(function () {
      return 0.5 - Math.random();
    });

    let i = 0;

    while (i < 6) {
      this.heroWord = array[i];
      i = i < 5 ? i + 1 : 0;
      await new Promise((approve) => {
        window.setTimeout(approve, 2000);
      });
    }
  }

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

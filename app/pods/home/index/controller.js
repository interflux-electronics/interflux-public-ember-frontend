import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

// TODO: parallax the hero
// https://codepen.io/RenanB/pen/GZeBNg

export default class HomeIndexController extends Controller {
  @service media;
  @service window;

  @tracked heroPhrase;
  @tracked imageLeft = 'image-1';
  @tracked imageRight = 'image-6';

  constructor() {
    super(...arguments);

    this.startHeroWordLoop();
  }

  async startHeroWordLoop() {
    const array = [
      'with ***zero defects***',
      'with ***lead-free*** alloys',
      'with high ***reliability***',
      'with ***zero residue***',
      'with ***No Clean***',
      'at ***low temperatures***',
      '***VOC-free***',
      '***0.00% halides***'
    ].sort(function () {
      return 0.5 - Math.random();
    });

    const n = array.length - 1;

    let i = 0;

    while (i <= n) {
      this.heroPhrase = array[i];
      i = i < n ? i + 1 : 0;
      await this.window.delay(3000);
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
      .filterBy('onFrontPage')
      .sortBy('frontPageRank');
  }

  get newProducts() {
    return this.model.products
      .filterBy('status', 'new')
      .filterBy('onFrontPage')
      .sortBy('frontPageRank');
  }

  get popularLayout() {
    return this.popularProducts.length === 4 ? 'two-columns' : 'three-columns';
  }

  get newLayout() {
    return this.newProducts.length === 4 ? 'two-columns' : 'three-columns';
  }

  get yearCount() {
    const today = new Date();

    return today.getFullYear() - 1980;
  }
}

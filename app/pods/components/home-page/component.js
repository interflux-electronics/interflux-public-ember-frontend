import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

// TODO: parallax the hero
// https://codepen.io/RenanB/pen/GZeBNg

export default class HomePageComponent extends Component {
  @service media;
  @service store;
  @service translation;
  @service window;

  @tracked heroPhrase;
  @tracked imageLeft = 'image-1';
  @tracked imageRight = 'image-6';

  @action
  onInsert() {
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
    ]
      .map((phrase, i) => {
        return this.translation.t(phrase, 'home.11', i);
      })
      .sort(() => {
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

  get sortedProducts() {
    return this.args.products.sortBy('frontPageRank');
  }

  get newProducts() {
    return this.sortedProducts.filter((p) => p.isNew);
  }

  get popularProducts() {
    return this.sortedProducts.filter((p) => p.isPopular);
  }

  get popularLayout() {
    const n = this.popularProducts.length;
    return n === 4 || n === 0 ? 'two-columns' : 'three-columns';
  }

  get newLayout() {
    return this.newProducts.length === 4 ? 'two-columns' : 'three-columns';
  }

  @action
  showNextSection() {
    const top = document.getElementById('what-we-do').offsetTop;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  get pioneerQuote() {
    return `We've been pioneering soldering chemistry since 1980. That's **${this.yearCount} years** of accumulated experience in soldering electronics.`;
  }

  get yearCount() {
    const today = new Date();
    return today.getFullYear() - 1980;
  }
}

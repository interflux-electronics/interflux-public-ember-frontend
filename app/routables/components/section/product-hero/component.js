import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProductHeroComponent extends Component {
  @tracked heroImage;

  constructor(owner, args) {
    super(owner, args);
    this.heroImage = this.args.product.avatar;
  }

  @action
  setHero(image) {
    this.heroImage = image;
  }
}

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProductListFeaturedComponent extends Component {
  @tracked show = false;

  @action
  onClick() {
    this.show = !this.show;
  }

  get count() {
    return this.args.products.length;
  }

  get hasHiddenProducts() {
    return this.count > 0;
  }
}

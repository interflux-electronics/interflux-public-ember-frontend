import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SectionProductTilesComponent extends Component {
  @tracked showAll;

  @action
  toggle() {
    this.showAll = !this.showAll;
  }

  get featuredProducts() {
    return this.args.products.filterBy('featured').sortBy('order', 'name');
  }

  get hiddenProducts() {
    return this.args.products.rejectBy('featured').sortBy('order', 'name');
  }

  get hiddenCount() {
    return this.hiddenProducts.length;
  }
}

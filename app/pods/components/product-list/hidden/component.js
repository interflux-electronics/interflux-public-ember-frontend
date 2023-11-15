import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProductListHiddenComponent extends Component {
  @tracked expanded = false;

  @action
  onClick() {
    this.expanded = !this.expanded;
  }

  get count() {
    return this.args.products.length;
  }
}

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HeaderDesktopMenuProductsComponent extends Component {
  @tracked imagePosition = 1;

  @action
  showImage(i) {
    this.imagePosition = i;
  }
}

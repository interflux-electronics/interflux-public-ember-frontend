import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class HeaderDesktopMenuProductsComponent extends Component {
  @service header;

  @tracked imagePosition = 1;

  @action
  showImage(i) {
    this.imagePosition = i + 1;
  }
}

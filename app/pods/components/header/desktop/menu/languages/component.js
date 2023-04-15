import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class HeaderDesktopMenuProductsComponent extends Component {
  @service router;

  @tracked imagePosition = 1;

  @action
  showImage(i) {
    this.imagePosition = i;
  }

  get path() {
    return this.router.currentURL;
  }
}

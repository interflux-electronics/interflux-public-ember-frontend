import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PastWebinarEventComponent extends Component {
  @tracked showContent = false;

  @action expand() {
    this.showContent = true;
  }

  @action collapse() {
    this.showContent = false;
  }
}

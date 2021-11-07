import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PastWebinarEventComponent extends Component {
  @tracked showDetails = false;

  @action toggleDetails(event) {
    this.showDetails = !this.showDetails;

    // Remove focus from the toggle button
    event.currentTarget.blur();
  }
}

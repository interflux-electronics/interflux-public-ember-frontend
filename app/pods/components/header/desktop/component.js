import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HeaderDesktopComponent extends Component {
  @tracked linePosition = 1;

  @action
  moveLineTo(i) {
    this.linePosition = i;
  }
}

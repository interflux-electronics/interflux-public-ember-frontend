import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class HeaderDesktopMenuComponent extends Component {
  // Prevent the <Page> component from closing the menu.
  @action
  preventClose(event) {
    event.stopPropagation();
  }
}

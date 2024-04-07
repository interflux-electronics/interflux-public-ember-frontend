import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ModalComponent extends Component {
  // @arg id;
  // @arg theme; 'white-text'

  @service modal;
  @service router;

  get theme() {
    return this.args.theme || 'white-box';
  }

  get parentRoute() {
    const { currentRouteName } = this.router;

    if (currentRouteName.includes('.')) {
      return currentRouteName.split('.').slice(0, -1).join('.');
    } else {
      return 'index';
    }
  }
}

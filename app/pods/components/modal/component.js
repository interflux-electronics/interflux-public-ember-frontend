import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ModalComponent extends Component {
  // @arg id;
  // @arg theme; 'white-text'

  @service router;

  get theme() {
    return this.args.theme || 'white-box';
  }

  get parentRoute() {
    return this.router.currentRouteName.split('.').slice(0, -1).join('.');
  }
}

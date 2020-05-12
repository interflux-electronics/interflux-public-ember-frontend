import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ButtonRouteComponent extends Component {
  @action
  onHover() {
    if (this.args.onHover) {
      this.args.onHover();
    }
  }
}

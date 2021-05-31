import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ButtonComponent extends Component {
  get classes() {
    return ['button', this.type, this.theme, this.icon, this.isBusy].join(' ');
  }

  get type() {
    return this.args.url ? 'url' : this.args.route ? 'route' : 'action';
  }

  get theme() {
    return this.args.theme || 'no-theme';
  }

  get icon() {
    return `has-icon ${this.args.icon}` || 'no-icon';
  }

  get isBusy() {
    return this.args.isBusy ? 'busy' : 'idle';
  }

  @action
  handleClick() {
    if (this.args.onClick && !this.args.isBusy) {
      this.args.onClick();
    }
  }
}

import Component from '@glimmer/component';
import { action } from '@ember/object';

// TODO: convert to Typescript
//
// interface <Args> {
//   text?: string;
//   icon?: string;
//   url?: string;
//   theme?: string;
//   isBusy?: string;
//   onClick?: function;
// }

export default class ButtonComponent extends Component {
  get classes() {
    return [
      'button',
      this.type,
      this.theme,
      this.icon,
      this.isBusy,
      this.args.class
    ].join(' ');
  }

  get type() {
    return this.args.url ? 'url' : this.args.route ? 'route' : 'action';
  }

  get theme() {
    return this.args.theme || 'no-theme';
  }

  get icon() {
    return this.args.icon ? `has-icon ${this.args.icon}` : 'no-icon';
  }

  get isBusy() {
    return this.args.isBusy ? 'busy' : 'idle';
  }

  @action
  onClick(event) {
    if (this.args.onClick && !this.args.isBusy) {
      this.args.onClick(event);
    }
  }

  @action
  onMouseEnter(event) {
    if (this.args.onMouseEnter) {
      this.args.onMouseEnter(event);
    }
  }

  @action
  onMouseOut(event) {
    if (this.args.onMouseOut) {
      this.args.onMouseOut(event);
    }
  }

  @action
  onFocus(event) {
    if (this.args.onFocus) {
      this.args.onFocus(event);
    }
  }

  @action
  onBlur(event) {
    if (this.args.onBlur) {
      this.args.onBlur(event);
    }
  }
}

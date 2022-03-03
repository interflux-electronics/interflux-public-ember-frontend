import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class InputString extends Component {
  @tracked hasHover = false;
  @tracked hasFocus = false;

  get classes() {
    return [
      this.args.theme || null,
      this.args.icon && this.iconIsValid ? 'has-icon' : 'no-icon',
      this.hasFocus ? 'has-focus' : 'no-focus',
      this.hasHover ? 'has-hover' : 'no-hover'
    ].join(' ');
  }

  get type() {
    return this.args.type || 'text';
  }

  get iconIsValid() {
    const valid = ['search'].includes(this.args.icon);

    if (!valid) {
      console.warn(
        `<Button @icon="${this.args.icon}"> cannot be rendered. Invalid icon.`
      );
    }

    return valid;
  }

  @action
  onFocus(event) {
    this.hasFocus = true;

    if (this.args.onFocus) {
      this.args.onFocus(event);
    }

    // Select all text inside the <input> on focus
    event.target.select();
  }

  @action
  onBlur(event) {
    this.hasFocus = false;

    if (this.args.onBlur) {
      this.args.onBlur(event);
    }
  }

  @action
  onMouseOver(event) {
    this.hasHover = true;

    if (this.args.onMouseOver) {
      this.args.onMouseOver(event);
    }
  }

  @action
  onMouseOut(event) {
    this.hasHover = false;

    if (this.args.onMouseOut) {
      this.args.onMouseOut(event);
    }
  }

  @action
  onKeyDown(event) {
    if (this.args.onKeyDown) {
      this.args.onKeyDown(event);
    }
  }

  @action
  onKeyUp(event) {
    if (this.args.onKeyUp) {
      this.args.onKeyUp(event);
    }
  }

  // @action
  // onKeyUp(event) {
  //   const value = event.target.value;
  //   const valueChanged = value !== this.value;
  //   if (valueChanged) {
  //     // Update local value
  //     this.value = value;
  //
  //     // Fire up event
  //     if (this.args.onChange) {
  //       this.args.onChange(value);
  //     }
  //   }
  //
  //   if (event.key === 'Enter') {
  //     if (this.args.onEnter) {
  //       this.args.onEnter(event);
  //     }
  //   }
  // }
}

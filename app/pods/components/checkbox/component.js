import Component from '@glimmer/component';
import { action } from '@ember/object';

// <Checkbox
//   @id={{this.id}}
//   @checked={{this.value}}
//   @onClick={{this.onClick}}
// />

export default class CheckboxComponent extends Component {
  // @arg id;
  // @arg checked;
  // @arg onClick;

  get classes() {
    return [this.args.checked ? 'checked' : 'not-checked'].join(' ');
  }

  input; // the <input> element

  @action
  onInsert(element) {
    this.input = element;
  }

  @action
  onClick() {
    this.args.onClick();
    this.input.blur();
  }

  @action
  onKeyDown(event) {
    const pressedEnter = event.code === 'Enter';
    const pressedSpace = event.code === 'Space';

    if (pressedSpace || pressedEnter) {
      event.preventDefault();
      this.args.onClick();
    }
  }
}

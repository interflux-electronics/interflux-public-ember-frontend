import FormFieldComponent from '../form-field/component';
import { set } from '@ember/object';

export default FormFieldComponent.extend({
  classNames: ['form-textarea'],

  // Passed in
  value: undefined,
  onUpdate: undefined,
  onEnter: undefined,
  onFocusIn: undefined,
  onFocusOut: undefined,
  label: undefined,
  placeholder: undefined,
  rows: undefined,

  actions: {
    _onUpdate(value) {
      this.onUpdate(value);
    },
    _onOnEnter(e) {
      this.onEnter(e);
    },
    _onFocusIn(e) {
      set(this, 'hasFocus', true);
      set(this, 'clickedError', false);
      this.onFocusIn(e);
    },
    _onFocusOut(e) {
      set(this, 'hasFocus', false);
      this.onFocusOut(e);
    },
    hideError() {
      // set(this, 'hasFocus', true); // HACK
    }
  }
});

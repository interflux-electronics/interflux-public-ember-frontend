import Button from '../component';
import { get } from '@ember/object';
import { readOnly, notEmpty } from '@ember/object/computed';

const empty = [];

export default Button.extend({
  tagName: 'button',
  classNames: ['button-task'],
  classNameBindings: [
    'isRunning:busy:idle',
    'showError:show-error:no-errors',
    'style'
  ],
  attributeBindings: ['tabindex', 'disabled'],
  tabindex: 1,
  disabled: false,

  // Show loading state
  isRunning: readOnly('task.isRunning'),

  // Show task error
  showError: notEmpty('error'),
  error: readOnly('errors.firstObject'),
  errors: empty,

  // Perform the task passed in
  click() {
    get(this, 'onClick')();
  }
});

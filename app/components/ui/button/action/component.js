import Button from '../component';
import { PropTypes } from 'ember-prop-types';

const { func, string } = PropTypes;

export default Button.extend({
  propTypes: {
    onClick: func.isRequired,
    text: string,
    icon: string
  },

  classNames: ['button-with-action'],

  // Passed in
  onClick: undefined,
  text: undefined,
  icon: undefined,

  // Perform the action passed in
  click(event) {
    this.onClick(event);
  }
});

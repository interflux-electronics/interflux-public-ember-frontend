import Button from '../component';

export default Button.extend({
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

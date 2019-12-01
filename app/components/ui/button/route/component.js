import Button from '../component';
import { hrefTo } from 'ember-href-to/helpers/href-to';
import { computed } from '@ember/object';

export default Button.extend({
  tagName: 'a',
  classNames: ['button-to-route'],
  attributeBindings: ['href'],

  // Passed in
  route: undefined,
  arg1: undefined,
  arg2: undefined,
  arg3: undefined,
  text: undefined,
  icon: undefined,

  // Return the URL matching the route
  href: computed('route', function() {
    if (this.arg1 && this.arg2 && this.arg3) {
      return hrefTo(this, this.route, this.arg1, this.arg2, this.arg3);
    } else if (this.arg1 && this.arg2) {
      return hrefTo(this, this.route, this.arg1, this.arg2);
    } else if (this.arg1) {
      return hrefTo(this, this.route, this.arg1);
    } else {
      return hrefTo(this, this.route);
    }
  })
});

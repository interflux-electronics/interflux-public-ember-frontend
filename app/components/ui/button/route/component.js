import Button from '../component';
import { hrefTo } from 'ember-href-to/helpers/href-to';
import { computed } from '@ember/object';
import { PropTypes } from 'ember-prop-types';

const { string } = PropTypes;

export default Button.extend({
  propTypes: {
    route: string.isRequired,
    arg1: string,
    arg2: string,
    arg3: string,
    text: string,
    icon: string
  },

  tagName: 'a',
  classNames: ['button-to-route'],
  attributeBindings: ['href'],

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

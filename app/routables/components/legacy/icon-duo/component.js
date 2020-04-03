import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';

export default Component.extend({
  classNames: ['icon-duo'],

  propTypes: {
    icon1: PropTypes.string,
    icon2: PropTypes.string
  }
});

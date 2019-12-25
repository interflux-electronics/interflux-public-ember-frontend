import Component from '@ember/component';
import { computed } from '@ember/object';
import { PropTypes } from 'ember-prop-types';

const availableIcons = [
  'arrow-right',
  'dipping',
  'dispensing',
  'foam-fluxing',
  'geo-marker',
  'jet-fluxing',
  'pre-tinning',
  'reflow-soldering',
  'rework-and-repair',
  'search',
  'selective-soldering',
  'shopping-cart',
  'soldering-fluxes',
  'spray-fluxing',
  'stencil-printing',
  'unknown',
  'user',
  'water-based',
  'wave-soldering'
];

export default Component.extend({
  tagName: 'i',
  classNames: ['icon'],
  classNameBindings: ['name'],

  valid: computed('name', function() {
    return availableIcons.includes(this.name);
  }),

  propTypes: {
    name: PropTypes.oneOf(availableIcons).isRequired
  }
});

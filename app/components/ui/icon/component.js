import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';

const propTypes = {
  name: PropTypes.oneOf([
    'arrow-right',
    'wave-soldering',
    'dipping',
    'dispensing',
    'foam-fluxing',
    'jet-fluxing',
    'pre-tinning',
    'reflow-soldering',
    'rework-and-repair',
    'selective-soldering',
    'spray-fluxing',
    'stencil-printing',
    'unknown'
  ]).isRequired
};

export default Component.extend({
  propTypes,
  tagName: 'i',
  classNames: ['icon'],
  classNameBindings: ['name']
});

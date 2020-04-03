import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';

const sizes = {
  grid: 'large',
  row: 'medium'
};

export default Component.extend({
  classNames: ['product-set'],
  classNameBindings: ['composition', 'isQuatro:quatro'],

  isQuatro: equal('count', 4),
  count: computed(function() {
    return this.products.length;
  }),

  isRow: equal('composition', 'row'),
  isGrid: equal('composition', 'grid'),

  sortedProducts: computed(function() {
    const products = this.products;
    // TODO: const products = this.products.filterBy('continued', true).sortBy('order');

    // In rows we show max 5 products
    if (this.isRow) {
      return products.slice(0, 5);
    }

    // In grids we show all products
    return products;
  }),

  cardSize: computed(function() {
    return sizes[this.composition];
  }),

  propTypes: {
    products: PropTypes.array.isRequired, // TODO
    composition: PropTypes.oneOf(['grid', 'row', 'hero']).isRequired,
    route: PropTypes.string,
    model: PropTypes.string
  }
});

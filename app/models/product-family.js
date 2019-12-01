import Model, { attr, hasMany } from '@ember-data/model';

export default Model.extend({
  slug: attr('string'),
  nameSingle: attr('string'),
  namePlural: attr('string'),

  products: hasMany('product')
});

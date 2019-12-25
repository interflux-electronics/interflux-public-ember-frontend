import Model, { attr, hasMany } from '@ember-data/model';

export default Model.extend({
  slug: attr('string'),
  icon: attr('string'),
  text: attr('string'),

  products: hasMany('product')
});

import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default Model.extend({
  slug: attr('string'),
  title: attr('string'),
  body: attr('string'),
  createdAt: attr('date'),
  updatedAt: attr('date')
});

import Model, { attr } from '@ember-data/model';

export default Model.extend({
  group: attr('string'),
  route: attr('string'),
  title: attr('string'),
  sub: attr('string')
});

import Model, { attr, hasMany } from '@ember-data/model';

export default class FeatureModel extends Model {
  @attr('string') slug;
  @attr('string') icon;
  @attr('string') text;

  @hasMany('product') products;
}

import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class ProductModel extends Model {
  @attr('string') slug;
  @attr('string') name;
  @attr('boolean') public;

  @belongsTo('product-family') productFamily;
  @belongsTo('image') image;

  @hasMany('document') documents;
  @hasMany('image') images;
  @hasMany('feature') features;

  @alias('productFamily') family;
  @alias('image') avatar;

  get qualities() {
    return this.features.filterBy('category', 'quality');
  }

  get processes() {
    return this.features.filterBy('category', 'process');
  }
}

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

  @alias('productFamily') family;
  @alias('image') avatar;
}

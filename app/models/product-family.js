import Model, { attr, hasMany } from '@ember-data/model';

export default class ProductFamilyModel extends Model {
  @attr('string') slug;
  @attr('string') code;
  @attr('string') nameSingle;
  @attr('string') namePlural;
  @attr('number') order;

  @hasMany('product') products;

  get count() {
    return this.products.length;
  }

  get rank() {
    return this.order || 999;
  }
}

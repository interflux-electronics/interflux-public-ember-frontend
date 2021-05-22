import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class ProductFamilyModel extends Model {
  @alias('id') slug;
  @attr('string') nameSingle;
  @attr('string') namePlural;
  @attr('string') gist;
  @attr('string') fullMonty;
  @attr('number') rank;

  @belongsTo('product-family', { inverse: 'subFamilies' }) productFamily;
  @hasMany('product-family', { inverse: 'productFamily' }) subFamilies;

  @hasMany('product') products;

  get productsByRank() {
    const rank = 'rankAmongFamily';
    const records = this.products;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);

    return [...ranked, ...rankless];
  }

  @hasMany('product-family-image') productFamilyImages;

  get images() {
    const rank = 'rankAmongImages';
    const records = this.productFamilyImages;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);
    const sorted = [...ranked, ...rankless];

    return sorted.map((record) => record.image);
  }

  get count() {
    return this.products.length;
  }

  get isSubFamily() {
    return this.productFamily.get('id') ? true : false;
  }

  get isMainFamily() {
    return !this.isSubFamily;
  }

  // Returns plural family name with first letter capitalised
  get label() {
    const str = this.namePlural || '';
    return str[0].toUpperCase() + str.slice(1);
  }
}

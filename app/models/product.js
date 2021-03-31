import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class ProductModel extends Model {
  @alias('id') slug;
  @attr('string') name;
  @attr('string') label;
  @attr('string') pitch;
  @attr('string') status;

  @attr('string') pitch;
  @attr('string') summary;
  @attr('string') properties;
  @attr('string') instructions;

  @attr('number') rankAmongFamily;

  @attr('boolean') compliesWithROHS;
  @attr('boolean') compliesWithIEC;
  @attr('boolean') compliesWithIPC;
  @attr('boolean') compliesWithISO;
  @attr('string') testResults;

  @belongsTo('image', { inverse: 'product' }) image;
  @alias('image') avatar;

  @belongsTo('product-family') productFamily;
  @alias('productFamily') family;

  @belongsTo('product', { inverse: 'inferiorProducts' }) superiorProduct;
  @hasMany('product', { inverse: 'superiorProduct' }) inferiorProducts;

  @hasMany('product-use') productUses;
  @hasMany('product-quality') productQualities;
  @hasMany('product-document') productDocuments;
  @hasMany('product-image') productImages;

  get hasUses() {
    return this.uses && this.uses.length > 0;
  }

  get hasQualities() {
    return this.qualities && this.qualities.length > 0;
  }

  get uses() {
    const rank = 'rankAmongUses';
    const records = this.productUses;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);
    const sorted = [...ranked, ...rankless];

    return sorted.map(record => record.use);
  }

  get qualities() {
    const rank = 'rankAmongQualities';
    const records = this.productQualities;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);
    const sorted = [...ranked, ...rankless];

    return sorted.map(record => record.quality);
  }

  get documents() {
    const rank = 'rankAmongDocuments';
    const records = this.productDocuments;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);
    const sorted = [...ranked, ...rankless];

    return sorted.map(record => record.document);
  }

  get images() {
    const rank = 'rank';
    const records = this.productImages;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);
    const sorted = [...ranked, ...rankless];

    return sorted.map(record => record.image);
  }

  get isNew() {
    return this.status === 'new';
  }

  get isPopular() {
    return this.status === 'popular';
  }

  get isRecommended() {
    return this.status === 'recommended';
  }

  get isOutdated() {
    return this.status === 'outdated';
  }

  get isDiscontinued() {
    return this.status === 'discontinued';
  }

  get testResultsArray() {
    return JSON.parse(this.testResults);
  }
}

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
  @attr('boolean') compliesWithIPCJSTD004A;
  @attr('boolean') compliesWithIPCJSTD004B;
  @attr('boolean') compliesWithIPCJSTD005;
  @attr('boolean') compliesWithISO;
  @attr('string') testResults;

  @belongsTo('image', { inverse: 'product' }) image;
  @alias('image') avatar;

  @belongsTo('product-family') productFamily;
  @alias('productFamily') family;

  get mainFamily() {
    return this.productFamily.get('isMainFamily')
      ? this.productFamily
      : this.productFamily.get('productFamily');
  }

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

  get familyLabel() {
    const family = this.family.get('nameSingle');
    const label = this.label;

    return label ? label : family;
  }

  get compliesWithIPC() {
    return (
      this.compliesWithIPCJSTD004A ||
      this.compliesWithIPCJSTD004B ||
      this.compliesWithIPCJSTD005
    );
  }

  get listForIPC() {
    const arr = [
      this.compliesWithIPCJSTD004A ? 'J-STD-004A' : null,
      this.compliesWithIPCJSTD004B ? 'J-STD-004B' : null,
      this.compliesWithIPCJSTD005 ? 'J-STD-005' : null
    ].filter(x => !!x);

    const last = arr.pop();

    return arr.join(', ') + ' and ' + last;
  }
}

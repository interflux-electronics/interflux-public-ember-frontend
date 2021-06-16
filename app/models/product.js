import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class ProductModel extends Model {
  @attr('string') name;
  @attr('string') label;
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
  @attr('boolean') onFrontPage;
  @attr('number') frontPageRank;

  @belongsTo('image', { inverse: 'product' }) image;

  // Avatar image properties are cached on the product record as to avoid N+1 when loading long lists of products
  @attr('string') avatarPath;
  @attr('string') avatarAlt;
  @attr('string') avatarCaption;
  @attr('string') avatarVariations;

  @belongsTo('product-family') productFamily;

  get family() {
    return this.productFamily;
  }

  get mainFamily() {
    return this.family.get('isMainFamily')
      ? this.family
      : this.family.get('productFamily');
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

  get productUsesSorted() {
    const rank = 'rankAmongUses';
    const records = this.productUses;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);

    return [...ranked, ...rankless];
  }

  get uses() {
    return this.productUsesSorted.map((record) => record.use);
  }

  get productQualitiesSorted() {
    const rank = 'rankAmongQualities';
    const records = this.productQualities;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);

    return [...ranked, ...rankless];
  }

  get qualities() {
    return this.productQualitiesSorted.map((record) => record.quality);
  }

  get documents() {
    const rank = 'rankAmongDocuments';
    const records = this.productDocuments;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);
    const sorted = [...ranked, ...rankless];

    return sorted.map((record) => record.document);
  }

  get images() {
    const rank = 'rank';
    const records = this.productImages;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);
    const sorted = [...ranked, ...rankless];

    return sorted.map((record) => record.image);
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
}

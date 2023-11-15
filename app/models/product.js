import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class ProductModel extends Model {
  @attr('boolean') compliesWithIEC;
  @attr('boolean') compliesWithIPCJSTD004A;
  @attr('boolean') compliesWithIPCJSTD004B;
  @attr('boolean') compliesWithIPCJSTD005;
  @attr('boolean') compliesWithISO;
  @attr('boolean') compliesWithROHS;
  @attr('boolean') onFrontPage;

  @attr('number') frontPageRank;
  @attr('number') rankAmongFamily;

  // TODO:
  // rankAmongSubFamily
  // rankAmongMainFamily

  @attr('string') avatarAlt;
  @attr('string') avatarCaption;
  @attr('string') avatarPath;
  @attr('string') avatarVariations;
  @attr('string') instructions;
  @attr('string') label;
  @attr('string') name;
  @attr('string') pitch;
  @attr('string') properties;
  @attr('string') status;
  @attr('string') summary;
  @attr('string') testResults;

  @belongsTo('image', { inverse: 'product' }) image;
  @belongsTo('product-family') mainFamily;
  @belongsTo('product-family') subFamily;
  @belongsTo('product', { inverse: 'inferiorProducts' }) superiorProduct;

  @hasMany('product-document') productDocuments;
  @hasMany('product-image') productImages;
  @hasMany('product-quality') productQualities;
  @hasMany('product-use') productUses;
  @hasMany('product', { inverse: 'superiorProduct' }) inferiorProducts;

  get familyLabel() {
    if (this.label) {
      return this.label;
    }

    if (this.subFamily.get('id')) {
      return this.subFamily.get('nameSingle');
    }

    if (this.mainFamily.get('id')) {
      return this.mainFamily.get('nameSingle');
    }

    console.warn(
      `${this.name} does not have a label, nor sub, nor main family`
    );

    return '?';
  }

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
    return this.productUsesSorted.mapBy('use');
  }

  get productQualitiesSorted() {
    const rank = 'rankAmongQualities';
    const records = this.productQualities;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);

    return [...ranked, ...rankless];
  }

  get qualities() {
    return this.productQualitiesSorted.mapBy('quality');
  }

  get documents() {
    const rank = 'rankAmongDocuments';
    const records = this.productDocuments;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);
    const sorted = [...ranked, ...rankless];

    return sorted.mapBy('document');
  }

  get images() {
    const rank = 'rank';
    const records = this.productImages;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);
    const sorted = [...ranked, ...rankless];

    return sorted.mapBy('image');
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

  // HACK: the backend should not be serving this... However, when side loading
  // records with includes the permanent filters are ignored (for now)
  get isOffline() {
    return this.status === 'offline';
  }

  get isFeatured() {
    return this.isNew || this.isPopular || this.isRecommended;
  }

  get isHidden() {
    return this.isOutdated || this.discountinued;
  }

  get testResultsArray() {
    return JSON.parse(this.testResults);
  }

  get compliesWithIPC() {
    return (
      this.compliesWithIPCJSTD004A ||
      this.compliesWithIPCJSTD004B ||
      this.compliesWithIPCJSTD005
    );
  }

  get statusRank() {
    return [
      'new',
      'popular',
      'recommended',
      'outdated',
      'discontinued',
      'offline'
    ].indexOf(this.status);
  }
}

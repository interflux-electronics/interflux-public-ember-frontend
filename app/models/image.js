import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import ENV from 'interflux/config/environment';

export default class ImageModel extends Model {
  @attr('string') path;
  @attr('string') alt;
  @attr('string') caption;
  @attr('string') variations;

  @belongsTo('product', { inverse: 'image' }) product;
  @hasMany('product', { inverse: 'images' }) products;
  @hasMany('product-image') productImages;
  @hasMany('cdn-files') files;

  @belongsTo('company') company;

  get category() {
    return this.path.split('/')[1];
  }

  get JPGs() {
    return this.files.filterBy('isJPG').sortBy('width');
  }

  get PNGs() {
    return this.files.filterBy('isPNG').sortBy('width');
  }

  get WEBPs() {
    return this.files.filterBy('isWEBP').sortBy('width');
  }

  get widestJPG() {
    return this.widest('jpg');
  }

  get widestPNG() {
    return this.widest('png');
  }

  get widestWEBP() {
    return this.widest('webp');
  }

  widest(fileType) {
    if (!this.variations) {
      return null;
    }

    // ['@200x200.jpg','@400x400.jpg','@200x200.webp','@400x400.webp']
    const ofSameType = this.variations
      .split(',')
      .filter((x) => x.split('.')[1] === fileType);

    // ['200x200','400x400']
    const sizes = ofSameType.map((path) => path.split('.')[0].replace('@', ''));

    // ['200','400']
    const widths = sizes.map((s) => s.split('x')[0]);

    // 400
    const max = Math.max(...widths);

    // '@400x400.jpg'
    const variation = ofSameType.find((v) => v.startsWith(`@${max}`));

    // 'https://cdn.interflux.com/images/product/LMPA-Q6/LMPA-Q6-500gr-jar-front@400x400.jpg'
    return `${ENV.cdnHost}/${this.path}${variation}`;
  }

  get allVariations() {
    if (!this.variations) {
      return null;
    }

    return this.variations.split(',').map((variation) => {
      return `${ENV.cdnHost}/${this.path}${variation}`;
    });
  }
}

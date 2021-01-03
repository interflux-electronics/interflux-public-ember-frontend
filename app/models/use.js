import Model, { attr, hasMany } from '@ember-data/model';
import ENV from 'interflux/config/environment';

export default class UseModel extends Model {
  @attr('string') slug;
  @attr('string') icon;
  @attr('string') text;
  @attr('string') gist;
  @attr('number') rank;

  @hasMany('product-use') productUses;
  @hasMany('product') products;
  @hasMany('image') images;

  get families() {
    return this.products.mapBy('family').uniqBy('id');
  }

  get iconURL() {
    return `${ENV.cdnHost}/${this.icon}`;
  }

  get name() {
    const str = this.text || '';
    return str[0].toUpperCase() + str.slice(1);
  }
}

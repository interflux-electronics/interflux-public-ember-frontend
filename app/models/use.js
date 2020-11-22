import Model, { attr, hasMany } from '@ember-data/model';
import ENV from 'interflux/config/environment';

export default class UseModel extends Model {
  @attr('string') slug;
  @attr('string') icon;
  @attr('string') text;
  @attr('string') gist;

  @hasMany('product-use') productUses;
  @hasMany('product') products;

  get families() {
    return this.products.mapBy('family').uniqBy('id');
  }

  get iconURL() {
    return `${ENV.cdnHost}/${this.icon}`;
  }
}

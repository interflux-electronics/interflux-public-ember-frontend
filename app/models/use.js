import Model, { attr, hasMany } from '@ember-data/model';
import ENV from 'interflux/config/environment';

export default class UseModel extends Model {
  @attr('string') slug;
  @attr('string') icon;
  @attr('string') text;
  @attr('string') gist;
  @attr('number') rank;

  @hasMany('product-use') productUses;
  @hasMany('image') images;

  get products() {
    return this.productUses.sortBy('rank').mapBy('product');
  }

  get families() {
    return this.products.mapBy('family').uniqBy('id');
  }

  get iconURL() {
    return this.icon ? `${ENV.cdnHost}/${this.icon}` : null;
  }

  get label() {
    return `For ${this.text}`;
  }

  get slug() {
    return `for-${this.id}`;
  }
}

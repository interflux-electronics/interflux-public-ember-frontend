import Model, { attr, hasMany } from '@ember-data/model';
import ENV from 'interflux/config/environment';

export default class UseModel extends Model {
  @attr('string') slug;
  @attr('string') icon;
  @attr('string') text;
  @attr('string') gist;
  @attr('number') rank;

  @hasMany('product-use') productUses;

  get productsByRank() {
    const rank = 'rankAmongProducts';
    const records = this.productUses;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);
    const sorted = [...ranked, ...rankless];

    return sorted.map(record => record.product);
  }

  get families() {
    return this.products.mapBy('family').uniqBy('id');
  }

  @hasMany('use-image') useImages;

  get images() {
    const rank = 'rankAmongImages';
    const records = this.useImages;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);
    const sorted = [...ranked, ...rankless];

    return sorted.map(record => record.image);
  }

  get iconURL() {
    return this.icon
      ? `${ENV.cdnHost}/${this.icon}`
      : `${ENV.cdnHost}/images/logos/secondary-interflux-electronics-symbol-2.svg`;
  }

  get label() {
    return `For ${this.text}`;
  }

  get slug() {
    return `for-${this.id}`;
  }
}

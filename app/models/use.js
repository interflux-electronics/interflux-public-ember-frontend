import Model, { attr, hasMany } from '@ember-data/model';
import ENV from 'interflux/config/environment';

export default class UseModel extends Model {
  @attr('string') slug;
  @attr('string') icon;
  @attr('string') text;
  @attr('string') gist;
  @attr('number') rank;

  get name() {
    return this.text;
  }

  @hasMany('product-use') productUses;

  get products() {
    return this.productUses.mapBy('product').uniqBy('id');
  }

  get productsByRank() {
    const rank = 'rankAmongProducts';
    const records = this.productUses;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);
    const sorted = [...ranked, ...rankless];

    return sorted.map((record) => record.product);
  }

  get mainFamilies() {
    return this.productUses
      .mapBy('product')
      .mapBy('mainFamily')
      .uniqBy('id')
      .sortBy('rank');
  }

  @hasMany('use-image') useImages;

  get images() {
    const rank = 'rankAmongImages';
    const records = this.useImages;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);
    const sorted = [...ranked, ...rankless];

    return sorted.map((record) => record.image);
  }

  get iconURL() {
    return this.icon
      ? `${ENV.cdnHost}/${this.icon}`
      : `${ENV.cdnHost}/images/icons/check.svg`;
  }

  get label() {
    const str = this.text || '';
    return str[0].toUpperCase() + str.slice(1);
  }

  get forLabel() {
    return `For ${this.text}`;
  }

  get forSlug() {
    return `for-${this.id}`;
  }

  get improvedRank() {
    return this.rank || '999';
  }
}

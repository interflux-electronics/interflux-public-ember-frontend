import Model, { attr } from '@ember-data/model';
import ENV from 'interflux/config/environment';

export default class VideoModel extends Model {
  @attr('string') path;
  @attr('string') variations;
  @attr('string') titlePublic;

  get allVariations() {
    if (!this.variations) {
      return null;
    }

    return this.variations.split(',').map((variation) => {
      return `${ENV.cdnHost}/${this.path}${variation}`;
    });
  }
}

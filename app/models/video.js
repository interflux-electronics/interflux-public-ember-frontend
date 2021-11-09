import Model, { attr } from '@ember-data/model';

export default class VideoModel extends Model {
  @attr('string') path;
  @attr('string') variations;
  @attr('string') titlePublic;
}

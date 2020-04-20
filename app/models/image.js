import Model, { attr } from '@ember-data/model';

export default class ImageModel extends Model {
  @attr('string') path;
  @attr('array') sizes;
  @attr('array') formats;
  @attr('string') alt;
  @attr('string') caption;
}

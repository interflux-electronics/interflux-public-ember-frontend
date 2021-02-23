import Model, { attr, belongsTo } from '@ember-data/model';

export default class QualityImageModel extends Model {
  @belongsTo('quality') quality;
  @belongsTo('image') image;

  @attr('number') rankAmongImages;
}

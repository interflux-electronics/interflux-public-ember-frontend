import Model, { belongsTo, attr } from '@ember-data/model';

export default class ProductQualityModel extends Model {
  @belongsTo('product') product;
  @belongsTo('quality') quality;

  @attr('number', { defaultValue: 999 }) rank;
}

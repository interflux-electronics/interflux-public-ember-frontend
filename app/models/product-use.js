import Model, { belongsTo, attr } from '@ember-data/model';

export default class ProductUseModel extends Model {
  @belongsTo('product') product;
  @belongsTo('use') use;

  @attr('number', { defaultValue: 999 }) rank;
}

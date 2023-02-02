import Model, { attr, belongsTo } from '@ember-data/model';

export default class TranslationEventModel extends Model {
  @attr('string') code;
  @attr('string') updatedBy;
  @attr('date') createdAt;

  @belongsTo('translation') translation;
}

import Model, { attr } from '@ember-data/model';

export default class TranslationModel extends Model {
  @attr('string') location;
  @attr('string') language;
  @attr('string') english;
  @attr('string') native;
  @attr('string') status;
}

import Model, { attr } from '@ember-data/model';

export default class TranslationModel extends Model {
  @attr('string') key;
  @attr('string') value;
  @attr('string') locale;
}

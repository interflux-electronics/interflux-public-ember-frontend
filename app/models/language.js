import Model, { attr } from '@ember-data/model';

export default class LanguageModel extends Model {
  @attr('string') nameEnglish;
  @attr('string') nameNative;
  @attr('boolean') supported; // We offer translations
  @attr('boolean') ready; // Translations are ready for new API and Ember app
}

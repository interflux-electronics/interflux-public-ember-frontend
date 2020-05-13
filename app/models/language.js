import Model, { attr } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class LanguageModel extends Model {
  @alias('id') twoLetterCode;

  @attr('string') nameEnglish;
  @attr('string') nameNative;
  @attr('boolean') supported; // We offer translations
  @attr('boolean') ready; // Translations are ready for new API and Ember app
}

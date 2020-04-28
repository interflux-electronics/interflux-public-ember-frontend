import Model, { attr } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class LanguageModel extends Model {
  @alias('id') twoLetterCode;

  @attr('string') nameEnglish;
  @attr('string') nameNative;
  @attr('string') threeLetterCode;
  @attr('boolean') public;
}

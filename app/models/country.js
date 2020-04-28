import Model, { attr } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class CountryModel extends Model {
  @alias('id') twoLetterCode;
  @attr('string') nameEnglish;
  @attr('string') nameNative;
  @attr('string') threeLetterCode;
  @attr('string') numericCode;
  @attr('string') region;
  @attr('string') subregion;
  @attr('number') latitude;
  @attr('number') longitude;
  @attr('number') area;
  @attr('number') population;
  @attr('string') flagUrl;
  @attr('array') timezones;
  @attr('array') topLevelDomains;
  @attr('array') callingCodes;
}

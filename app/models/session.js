import Model, { attr } from '@ember-data/model';

export default class SessionModel extends Model {
  @attr('string') href;
  @attr('string') referrer;
  @attr('string') browserApp;
  @attr('string') browserWidth;
  @attr('string') browserHeight;
  @attr('string') browserLanguages;
  @attr('string') countryCode;
}

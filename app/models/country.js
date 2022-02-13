import Model, { attr, hasMany } from '@ember-data/model';

export default class CountryModel extends Model {
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

  get name() {
    return (
      this.nameEnglish +
      (this.nameNative !== this.nameEnglish ? ` - ${this.nameNative}` : '')
    );
  }

  @hasMany('company-market') companyMarkets;

  get marketsSorted() {
    return this.companyMarkets.sortBy('rankAmongCompanies');
  }

  get companies() {
    return this.companyMarkets.sortBy('rankAmongCompanies').mapBy('company');
  }
}

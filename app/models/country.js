import Model, { attr, hasMany } from '@ember-data/model';

export default class CountryModel extends Model {
  @attr('string') nameEnglish;
  @attr('string') nameNative;
  @attr('number') latitude;
  @attr('number') longitude;

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

import Model, { belongsTo, attr } from '@ember-data/model';

export default class CompanyMarketModel extends Model {
  @attr('number') rankAmongCompanies;
  @attr('number') rankAmongCountries;
  @attr('boolean') companyIsRecommended;

  @belongsTo('company') company;
  @belongsTo('country') country;
}

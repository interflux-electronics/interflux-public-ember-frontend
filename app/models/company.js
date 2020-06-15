import Model, { attr, belongsTo } from '@ember-data/model';

export default class CompanyModel extends Model {
  @attr('string') businessName;
  @attr('string') legalName;
  @attr('string') address;
  @attr('string') phone;
  @attr('string') fax;
  @attr('array') emails;
  @attr('string') website;
  @attr('number') latitude;
  @attr('number') longitude;
  @attr('number') order;

  @belongsTo('country') country;

  // @hasMany('member') member;
  // @hasMany('market') country;

  get rank() {
    return this.order || 999;
  }
}

import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class CompanyModel extends Model {
  @attr('string') businessName;
  @attr('string') legalName;
  @attr('string') address;
  @attr('string') phone;
  @attr('string') fax;
  @attr('string') emailGeneral;
  @attr('string') emailSupport;
  @attr('string') emailOrders;
  @attr('string') emailAccounting;
  @attr('string') website;
  @attr('string') latitude;
  @attr('string') longitude;
  @attr('string') description;

  @attr('number') order;
  @attr('boolean') public;

  @belongsTo('country') country;

  @hasMany('country') markets;

  @hasMany('company-member') companyMembers;
  @hasMany('company-market') companyMarkets;

  get members() {
    const publicMembers = this.companyMembers
      .filterBy('public')
      .mapBy('person');

    if (publicMembers.length !== this.companyMembers.length) {
      console.warn(
        `a non-public member of ${this.businessName} has been serialised`
      );
    }

    return publicMembers.sortBy('rankAmongMembers');
  }

  get rank() {
    return this.order || 999;
  }

  get websiteForHumans() {
    return this.website ? this.website.replace('https://', '') : null;
  }

  get hasOneEmail() {
    return (
      this.emailGeneral &&
      !(this.emailSupport || this.emailOrders || this.emailAccounting)
    );
  }

  get phoneForRobots() {
    return this.phone ? this.phone.replace(/\s|-|\.|\(|\)/g, '') : null;
  }

  get faxForRobots() {
    return this.phone ? this.phone.replace(/\s|-|\.|\(|\)/g, '') : null;
  }

  get hasMultipleContacts() {
    return this.companyMembers && this.companyMembers.length > 1;
  }

  get slug() {
    return this.businessName.replace(/\(|\)|®|,|\./g, '').replace(/\s/g, '-');
  }
}

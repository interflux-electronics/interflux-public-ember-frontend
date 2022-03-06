import Model, { attr, belongsTo } from '@ember-data/model';

export default class CompanyMemberModel extends Model {
  @attr('string') title;
  @attr('string') email;
  @attr('string') phone;
  @attr('string') landline;
  @attr('boolean') public;
  @attr('boolean') publicTitle;
  @attr('boolean') publicEmail;
  @attr('boolean') publicPhone;
  @attr('boolean') publicLandline;
  @attr('number') rankAmongCompanies;
  @attr('number') rankAmongMembers;

  @belongsTo('company') company;
  @belongsTo('person') person;

  get verifiedEmail() {
    if (!this.publicEmail && this.email) {
      console.warn(`a non-public email was serialised for ${this.person.name}`);
    }
    if (this.publicEmail && this.email) {
      return this.email;
    }
    return null;
  }

  get verifiedPhone() {
    if (!this.publicPhone && this.phone) {
      console.warn(`a non-public phone was serialised for ${this.person.name}`);
    }
    if (this.publicPhone && this.phone) {
      return this.phone;
    }
    return null;
  }

  get verifiedLandline() {
    if (!this.publicLandline && this.landline) {
      console.warn(
        `a non-public landline was serialised for ${this.person.name}`
      );
    }
    if (this.publicLandline && this.landline) {
      return this.landline;
    }
    return null;
  }

  get phoneForRobots() {
    return this.phone ? this.phone.replace(/\s|-|\.|\(|\)/g, '') : null;
  }

  get landlineForRobots() {
    return this.landline ? this.landline.replace(/\s|-|\.|\(|\)/g, '') : null;
  }
}

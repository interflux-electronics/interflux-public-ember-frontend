import Model, { attr, belongsTo } from '@ember-data/model';

export default class CompanyMemberModel extends Model {
  @attr('string') title;
  @attr('string') email;
  @attr('string') phone;
  @attr('boolean') public;
  @attr('boolean') publicTitle;
  @attr('boolean') publicEmail;
  @attr('boolean') publicPhone;
  @attr('number') rankAmongCompanies;
  @attr('number') rankAmongMembers;

  @belongsTo('company') company;
  @belongsTo('person') person;

  get _email() {
    if (!this.publicEmail && this.email) {
      console.warn(`a non-public email was serialised for ${this.person.name}`);
    }
    if (this.publicEmail && this.email) {
      return this.email;
    }
    return null;
  }

  get _phone() {
    if (!this.publicPhone && this.phone) {
      console.warn(`a non-public phone was serialised for ${this.person.name}`);
    }
    if (this.publicPhone && this.phone) {
      return this.phone;
    }
    return null;
  }
}

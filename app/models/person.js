import Model, { attr, hasMany } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr('string') firstName;
  @attr('string') lastName;
  @attr('string') chineseName;
  @attr('string') fullName;
  @attr('string') phone;
  @attr('string') email;
  @attr('boolean') public;
  @attr('string') avatarPath;
  @attr('string') avatarAlt;
  @attr('string') avatarCaption;
  @attr('string') avatarVariations;

  @hasMany('company') companies;
  @hasMany('company-member') companyMembers;

  get fullName() {
    return [this.firstName, this.lastName, this.chineseName].join(' ');
  }

  get memberOf() {
    return this.companies.mapBy('businessName').join(', ');
  }

  // TODO: replace this temporary hack with image records
  get avatarSrc() {
    if (this.fullName === 'Daniel Werkhoven') {
      return '/images/people/avatar-daniel@250x250.png';
    }

    if (this.fullName === 'Jan Werkhoven 岩') {
      return '/images/people/avatar-jan@150x150.png';
    }

    if (this.fullName === 'Steven Teliszewski') {
      return '/images/people/avatar-steven@160x160.jpg';
    }

    if (this.fullName === 'Roy Kingon') {
      return '/images/people/roy-kingon.jpg';
    }

    return null;
  }

  get hasAvatar() {
    return !!this.avatarSrc;
  }
}

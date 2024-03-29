import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class WebinarModel extends Model {
  @attr('string') title;
  @attr('string') topic;
  @attr('string') audience;
  @attr('string') url;
  @attr('number') startTime; // milliseconds since 1 January 1970
  @attr('number') duration; // minutes
  @attr('boolean') public;
  @attr('boolean') isUpcoming;

  @attr('string') imagePath;
  @attr('string') imageVariations;
  @attr('string') imageCaption;
  @attr('string') imageAlt;

  @belongsTo('person') person;
  @belongsTo('image') image;
  @belongsTo('video') video;
  @belongsTo('document') document;

  @hasMany('person') people;
  @hasMany('webinar-invitees') webinarInvitees;

  get startTimeUTC() {
    return this.formatStartTime('UTC');
  }

  get startTimeBelgium() {
    return this.formatStartTime('Europe/Brussels');
  }

  get startTimeSingapore() {
    return this.formatStartTime('Asia/Singapore');
  }

  get startTimeMelbourne() {
    return this.formatStartTime('Australia/Melbourne');
  }

  formatStartTime(timezone) {
    return this.startTime
      ? new Date(this.startTime)
          .toLocaleString('sv', {
            timeZone: timezone,
            dateStyle: 'short',
            timeStyle: 'short'
          })
          .replace(/-/g, '/')
          .replace(' ', ', ')
      : null;
  }

  get humanStartDate() {
    return '16 Oct 2021'; // TODO
  }

  get kebabStartDate() {
    return '2021-10-16'; // TODO
  }

  get isoStartDate() {
    const date = new Date(this.startTime);
    return date.toISOString();
  }
}

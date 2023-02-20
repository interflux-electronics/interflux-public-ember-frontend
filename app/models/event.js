import Model, { attr, belongsTo } from '@ember-data/model';

export default class EventModel extends Model {
  @attr('string') name;
  @attr('string') dates;
  @attr('string') startDate;
  @attr('string') endDate;
  @attr('string') city;
  @attr('string') description;

  @belongsTo('country') country;

  get datesCombined() {
    if (!this.startDate) {
      return null;
    }

    const startDate = this.startDate.split('-');
    const YYYY = startDate[0];
    const MM = Number(startDate[1]);
    const DD = Number(startDate[2]);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    const MMM = months[MM - 1];

    if (!this.endDate || this.endDate === this.startDate) {
      return `${DD} ${MMM} ${YYYY}`;
    }

    const endDate = this.endDate.split('-');
    const DD2 = Number(endDate[2]);
    const MM2 = Number(endDate[1]);

    if (MM === MM2) {
      return `${DD} – ${DD2} ${MMM} ${YYYY}`;
    }

    const MMM2 = months[MM2 - 1];

    return `${DD} ${MMM} – ${DD2} ${MMM2} ${YYYY}`;
  }

  get hasEnded() {
    if (!this.startDate) {
      return true;
    }

    const endDate = this.startDate.split('-');
    const YYYY = endDate[0];
    const MM = Number(endDate[1]);
    const DD = Number(endDate[2]);
    const now = new Date();
    const day = 60 * 60 * 24 * 1000;
    const tomorrow = new Date(now.getTime() + day);

    return new Date(YYYY, MM, DD) < tomorrow;
  }
}

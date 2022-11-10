import Model, { attr } from '@ember-data/model';

export default class EventModel extends Model {
  @attr('string') name;
  @attr('string') startDate;
  @attr('string') endDate;
  @attr('string') location;
  @attr('string') callToAction;

  get date() {
    // is one day event
    if (this.startDate === this.endDate) {
      return this.startDate;
    }
    // end date is in same month as start date
    if (this.startDate.split('/')[1] === this.endDate.split('/')[1]) {
      return `${this.startDate.split('/')[1]} - ${this.endDate}`;
    }
    return `${this.startDate} - ${this.endDate}`;
  }
}

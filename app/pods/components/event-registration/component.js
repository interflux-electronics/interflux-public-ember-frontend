import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import ENV from 'interflux/config/environment';

export default class EventRegistration extends Component {
  @service store;
  @service router;

  @tracked confirmedInterest;
  @tracked confirmedAttendee;
  @tracked confirmedEmail;

  @tracked firstName;
  @tracked lastName;
  @tracked role;
  @tracked company;
  @tracked email;

  @tracked record;

  @action confirmInterest() {
    this.confirmedInterest = true;
  }

  @action confirmAttendee() {
    this.confirmedAttendee = true;

    const properties = {
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      company: this.company,
      event: this.args.event,
      locale: ENV.locale
    };

    this.record = this.store.createRecord('event-attendee', properties);

    this.record.save();
  }

  @action confirmEmail() {
    this.confirmedEmail = true;
    this.record.email = this.email;
    this.record.save();
  }

  @action
  onKeyUp(event) {
    const input = event.target;
    const key = input.id;

    this[key] = input.value;
  }

  get parentRoute() {
    const { currentRouteName } = this.router;

    if (currentRouteName.includes('.')) {
      return currentRouteName.split('.').slice(0, -1).join('.');
    } else {
      return 'index';
    }
  }
}

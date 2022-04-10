import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class NotificationService extends Service {
  @service session;

  get list() {
    const arr = [];

    if (this.session.ipCountryId === 'BE') {
      arr.push('oritech');
    }

    return arr;
  }
}

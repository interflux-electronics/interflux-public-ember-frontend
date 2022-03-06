import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class UserService extends Service {
  @service store;

  @tracked ipCountryId;

  get ipCountry() {
    if (!this.ipCountryId) {
      return null;
    }

    return this.store.peekRecord('country', this.ipCountryId);
  }
}

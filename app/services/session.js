import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SessionService extends Service {
  @service api;
  @service store;
  @service window;
  @service fastboot;

  @tracked record;

  get ipCountryId() {
    return this.record.countryCode;
  }

  get ipCountry() {
    if (!this.ipCountryId) {
      return null;
    }

    return this.store.peekRecord('country', this.ipCountryId);
  }

  async create() {
    if (this.fastboot.isFastBoot) {
      return;
    }

    const session = this.store.createRecord('session', {
      href: window.location.href,
      referrer: window.location.referrer,
      browserApp: window.navigator.userAgent,
      browserWidth: window.innerWidth,
      browserHeight: window.innerHeight,
      browserLanguages: window.navigator.languages?.join(', ')
    });

    this.record = await session.save({
      adapterOptions: {
        whitelist: [
          'href',
          'referrer',
          'browserApp',
          'browserWidth',
          'browserHeight',
          'browserLanguages'
        ]
      }
    });

    this.updateSoon();
  }

  async updateSoon() {
    let done = false;
    let counter = 0;

    while (!done && counter < 5) {
      await this.window.delay(1000);
      this.record = await this.store.findRecord('session', this.record.id);
      counter++;
      if (this.ipCountryId) {
        done = true;
      }
    }
  }
}

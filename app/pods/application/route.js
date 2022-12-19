import ENV from 'interflux/config/environment';
import BaseRoute from 'interflux/pods/base/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class ApplicationRoute extends BaseRoute {
  @service store;
  @service session;

  beforeModel() {
    this.session.create();
  }

  model() {
    const locale = ENV.locale || 'en';

    console.log({ locale });

    return hash({
      translations: this.store.query('translation', {
        filter: { locale, key: '~^ui.' }
      })
    });
  }
}

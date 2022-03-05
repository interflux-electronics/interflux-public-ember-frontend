import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class SessionService extends Service {
  @service api;
  @service store;
  @service user;

  async create() {
    const url = `${this.api.host}/${this.api.namespace}/sessions`;

    const payload = {
      href: window.location.href,
      referrer: window.location.referrer,
      browserApp: window.navigator.userAgent,
      browserWidth: window.innerWidth,
      browserHeight: window.innerHeight,
      browserLanguages: window.navigator.languages?.join(', ')
    };

    const request = new Request(url, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers(this.api.headers),
      body: JSON.stringify(payload)
    });

    const response = await fetch(request).catch((error) => {
      return console.error(error);
    });

    // Read the JSON from the Body (async promise)
    // When back-end sends no JSON back, then status code should be 204
    const body = await response.json().catch((error) => {
      return console.error(error);
    });

    if (response.status === 201) {
      console.debug('success');
      this.user.ipCountryId = body['ip-country-id'];
      console.debug(this.user.ipCountryId);
    } else {
      console.warn('session not created');
      console.warn(body.errors[0]);
    }
  }
}

import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class VisitService extends Service {
  @service fastboot;
  @service store;
  @service uuid;

  // A unique UUID given to this website session. It will:
  // * be remembered across all Ember routes.
  // * added to all requests coming from Ember.
  // * help group requests for analytics
  @tracked id;

  track() {
    const ssr = this.fastboot.isFastBoot;
    const csr = !ssr;

    // Server Side Render
    // When the app renders on the server in Fastboot.
    if (ssr) {
      // 1. Create a visit ID.
      this.id = this.uuid.generate();

      // 2. Pass this visit ID down to Ember for CSR.
      this.fastboot.shoebox.put('visit', this.id);

      // 3. Create a SSR record in the database.
      const request = this.fastboot.request;
      const record = this.store.createRecord('server-side-render', {
        visitId: this.id,
        host: request.host,
        referrer: request.headers.headers['referer'].join(','),
        userAgent: request.headers.headers['user-agent'][0]
      });

      record.save();
    }

    // Client Side Render
    // When the app renders in the browser, in Ember.
    if (csr) {
      // 1. Retrieve the visit ID from the "shoebox" passed down from Fastboot to Ember.
      this.id = this.fastboot.shoebox.retrieve('visit');

      if (!this.id) {
        // 2. In the rare event that Ember would render without Fastboot (during outages), create a UUID.
        this.id = this.uuid.generate();
      }

      // 3. Create a CSR record in the database.
      const record = this.store.createRecord('client-side-render', {
        visitId: this.id,
        host: location.host,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        userId: null // TODO
      });

      record.save();
    }
  }
}

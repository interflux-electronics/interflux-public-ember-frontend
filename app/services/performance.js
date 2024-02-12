import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PerformanceService extends Service {
  @service fastboot;
  @service store;
  @service uuid;

  @tracked browserSession;

  // Log server side render (SSR) event in Fastboot
  ssr() {
    // 1. Create a ID for this SSR.
    const id = this.uuid.generate();

    // 2. Pass the ID down to Ember for linking up CSR later.
    this.fastboot.shoebox.put('ssr', id);

    // 3. Log the SSR in our database.
    const request = this.fastboot.request;
    const record = this.store.createRecord('server-side-render', {
      id,
      path: request.path,
      host: request.host,
      referrer: request.headers.headers['referer']?.join(','),
      userAgent: request.headers.headers['user-agent'][0]
    });
    record.save();
  }

  // Log client side render (CSR) in Ember
  csr() {
    // 1. Retrieve the SSR ID from the Fastboot "shoebox".
    const ssr = this.fastboot.shoebox.retrieve('ssr');

    // 2. Retrieve the browser session ID
    this.browserSession = sessionStorage.getItem('interflux.browserSession');

    // 3. Create a browser session ID if it does not exist.
    if (!this.browserSession) {
      this.browserSession = this.uuid.generate();
      sessionStorage.setItem('interflux.browserSession', this.browserSession);
    }

    // 4. Log the CSR in our database.
    const record = this.store.createRecord('client-side-render', {
      id: this.uuid.generate(),
      host: location.host,
      path: location.pathname + location.search + location.hash,
      referrer: document.referrer || null,
      userAgent: navigator.userAgent,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      serverSideRenderId: ssr,
      browserSessionId: this.browserSession,
      userId: null // TODO
    });
    record.save();
  }
}

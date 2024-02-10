import Service from '@ember/service';
import { inject as service } from '@ember/service';
// import { tracked } from '@glimmer/tracking';

export default class VisitService extends Service {
  @service fastboot;
  @service store;
  @service uuid;

  track() {
    const ssr = this.fastboot.isFastBoot;
    const csr = !ssr;

    // On server side render (SSR) in Fastboot
    if (ssr) {
      // 1. Create a ID for this SSR.
      const id = this.uuid.generate();

      // 2. Pass the ID down to Ember for linking up CSR later.
      this.fastboot.shoebox.put('ssr', id);

      // 3. Log the SSR in our database.
      const request = this.fastboot.request;
      console.log('🍒');
      console.log(request);
      console.log('🍒');
      const record = this.store.createRecord('server-side-render', {
        id,
        path: request.path,
        host: request.host,
        referrer: request.headers.headers['referer'].join(','),
        userAgent: request.headers.headers['user-agent'][0]
      });
      record.save();
    }

    // On client side render (CSR) in Ember
    if (csr) {
      // 1. Retrieve the SSR ID from the Fastboot "shoebox".
      const ssr = this.fastboot.shoebox.retrieve('ssr');

      // 2. Log the CSR in our database.
      const record = this.store.createRecord('client-side-render', {
        id: this.uuid.generate(),
        host: location.host,
        path: location.pathname + location.search + location.hash,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        serverSideRenderId: ssr,
        userId: null // TODO
      });
      record.save();
    }
  }
}

// import BaseRoute from 'interflux/pods/base/route';
import BaseRoute from 'interflux/pods/base/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class ContactRoute extends BaseRoute {
  @service store;

  model() {
    return hash({
      companies: this.store.findAll('company', {
        include: ['public_members', 'public_members.person'].join(',')
      }),
      countries: this.store.findAll('country')
      // delay: new Promise(resolve => setTimeout(resolve, 50000))
    });
  }
}

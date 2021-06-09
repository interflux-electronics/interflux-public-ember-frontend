import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class ContactRoute extends BaseRoute {
  model() {
    return hash({
      countries: this.store.findAll('country'),
      companies: this.store.findAll('company', {
        include: ['public_members', 'public_members.person'].join(',')
      })
      // delay: new Promise(resolve => setTimeout(resolve, 50000))
    });
  }
}

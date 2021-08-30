import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class ContactRoute extends BaseRoute {
  beforeModel() {
    this.headData.reset();
    this.headData.setProperties({
      title: 'Contact – Interflux',
      description:
        'Find us worldwide: Belgium, Germany, China, Singapore, Australia, Mexico, Poland, Russia, Sweden, ...',
      canonicalPath: 'contact'
    });
  }

  model() {
    return hash({
      countries: this.store.findAll('country'),
      companies: this.store.findAll('company', {
        include: ['public_members', 'public_members.person'].join(',')
      })
    });
  }
}

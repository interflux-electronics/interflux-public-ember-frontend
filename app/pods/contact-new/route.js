import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class ContactRoute extends BaseRoute {
  activate() {
    this.headData.reset();
    this.headData.setProperties({
      title: 'Contact – Interflux',
      description:
        'Find us worldwide: Belgium, Germany, China, Singapore, Australia, Mexico, Poland, Russia, Sweden, ...',
      canonicalPath: 'contact'
    });
    this.page.update({
      id: 'contact',
      title: 'Contact',
      backRoute: 'home',
      theme: 'blue overlap'
    });
  }

  model() {
    return hash({
      countries: this.store.findAll('country'),
      companies: this.store.findAll('company', {
        include: ['public_members', 'public_members.person'].join(',')
      }),
      companyMarkets: this.store.findAll('company-market')
      // error: new Promise((resolve, reject) => setTimeout(reject, 1 * 1000))
      // delay: new Promise((resolve) => setTimeout(resolve, 3 * 1000))
    });
  }
}

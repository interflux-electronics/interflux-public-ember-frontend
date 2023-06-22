import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class ContactRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.contact);
    this.page.update({
      id: 'contact',
      title: 'Contact',
      backRoute: 'index',
      theme: 'blue overlap'
    });
  }

  model() {
    if (this.cachedPayload) {
      return this.cachedPayload;
    }

    const payload = {
      countries: this.store.findAll('country'),
      markets: this.store.findAll('company-market'),
      companies: this.store.query('company', {
        include: ['public_members', 'public_members.person'].join(',')
      }),
      events: this.store.query('event', {
        include: 'country'
      })
    };

    return this.serverSideRendered ? payload : hash(payload);
  }
}

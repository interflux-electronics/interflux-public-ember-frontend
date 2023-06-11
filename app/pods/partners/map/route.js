import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class PartnersMapRoute extends BaseRoute {
  activate() {
    this.headData.setProperties({
      loadMapBox: true
    });
    this.page.update({
      showHeader: false,
      showFooter: false
    });
  }

  model() {
    if (this.cachedPayload) {
      return this.cachedPayload;
    }

    const payload = {
      countries: this.store.findAll('country'),
      companies: this.store.findAll('company', {
        include: ['public_members', 'public_members.person'].join(',')
      })
    };

    return this.serverSideRendered ? payload : hash(payload);
  }

  afterModel() {
    super.activate();

    this.window.scrollTo(0, 0);
  }
}

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
    // TODO: return cache

    return hash({
      countries: this.store.findAll('country'),
      companies: this.store.findAll('company', {
        include: ['public_members', 'public_members.person'].join(',')
      })
      // error: new Promise((resolve, reject) => setTimeout(reject, 1 * 1000))
      // delay: new Promise((resolve) => setTimeout(resolve, 30 * 1000))
    });
  }

  afterModel(model) {
    // TODO: add to cache
  }
}

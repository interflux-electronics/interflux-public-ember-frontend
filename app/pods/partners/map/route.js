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
    return hash({
      companies:
        this.cache.companies ||
        this.store.findAll('company', {
          include: ['public_members', 'public_members.person'].join(',')
        }),
      countries: this.cache.countries || this.store.findAll('country')
      // error: new Promise((resolve, reject) => setTimeout(reject, 1 * 1000))
      // delay: new Promise((resolve) => setTimeout(resolve, 30 * 1000))
    });
  }

  afterModel(model) {
    this.cache.countries = model.countries;
    this.cache.companies = model.companies;
  }
}

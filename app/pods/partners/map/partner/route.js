import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class PartnerRoute extends BaseRoute {
  model(params) {
    const companies = this.modelFor('partners.map').companies;
    const company = companies.find((c) => c.slug === params.slug);

    return hash({
      company
      // error: new Promise((resolve, reject) => setTimeout(reject, 1 * 1000))
      // delay: new Promise((resolve) => setTimeout(resolve, 3 * 1000))
    });
  }
}

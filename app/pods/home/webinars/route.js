import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class WebinarsRoute extends BaseRoute {
  beforeModel() {
    this.headData.reset();
    this.headData.setProperties({
      title: 'Webinars – Interflux',
      description:
        'Attend free online webinar events in which deep dive in the best practices, chemistry and metallurgy needed to solder electronics with high reliability.',
      canonicalPath: 'webinar'
    });
  }

  model() {
    return hash({
      webinars: this.store.findAll('webinar'),
      delay: new Promise((resolve) => setTimeout(resolve, 1 * 1000))
    });
  }
}

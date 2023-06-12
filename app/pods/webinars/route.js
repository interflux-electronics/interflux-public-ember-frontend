import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class WebinarsRoute extends BaseRoute {
  activate() {
    this.headData.reset();
    this.headData.setProperties({
      title: 'Webinars – Interflux',
      description:
        'Attend free online webinar events in which deep dive in the best practices, chemistry and metallurgy needed to solder electronics with high reliability.',
      canonicalPath: 'webinar'
    });
    this.page.update({
      id: 'webinars',
      title: 'Webinars',
      backRoute: 'index',
      theme: 'green overlap'
    });
  }

  model() {
    if (this.cachedPayload) {
      return this.cachedPayload;
    }

    const payload = {
      webinars: this.store.query('webinar', {
        include: ['image', 'video', 'document', 'person'].join(',')
      })
    };

    return this.serverSideRendered ? payload : hash(payload);
  }
}

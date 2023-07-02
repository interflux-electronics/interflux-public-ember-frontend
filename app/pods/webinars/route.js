import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class WebinarsRoute extends BaseRoute {
  activate() {
    super.activate();
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

    return hash(payload);
  }

  afterModel(model) {
    this.headData.update(this.seo.webinars(model.webinars));
  }
}

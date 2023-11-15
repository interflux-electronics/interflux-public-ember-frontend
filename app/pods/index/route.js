import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class HomepageRoute extends BaseRoute {
  activate() {
    super.activate();
    this.page.update({
      id: 'homepage',
      title: 'Interflux'
    });
  }

  model() {
    if (this.cachedPayload) {
      return this.cachedPayload;
    }

    const payload = {
      products: this.store.query('product', {
        filter: { onFrontPage: true },
        include: 'main_family,sub_family'
      }),
      events: this.store.query('event', {
        include: 'country'
      })
    };

    return hash(payload);
  }

  afterModel(model) {
    this.headData.update(this.seo.homepage(model.events));
  }
}

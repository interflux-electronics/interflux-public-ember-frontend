import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class HomepageRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.homepage);
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
        include: 'productFamily'
      }),
      events: this.store.query('event', {
        include: 'country'
      })
    };

    return this.serverSideRendered ? payload : hash(payload);
  }
}

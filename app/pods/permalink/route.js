import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class PermalinkRoute extends BaseRoute {
  model(params) {
    const slug = params.code;
    return hash({
      permalinks: this.store.query('permalink', { filter: { slug } })
    });
  }

  afterModel(model) {
    const links = model.permalinks.mapBy('redirectTo');
    if (links.length !== 1) {
      return this.router.transitionTo('index');
    }
    window.location = links[0];
  }
}

import BaseRoute from 'interflux/pods/base/route';

export default class CatchallRoute extends BaseRoute {
  beforeModel(transition) {
    console.warn('Unknown route');
    console.warn(location.href);
    console.warn({ transition, location });
  }
}

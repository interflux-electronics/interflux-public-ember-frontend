import Route from '@ember/routing/route';

export default class CatchallRoute extends Route {
  beforeModel(transition) {
    console.warn('Unknown route');
    console.warn(location.href);
    console.warn({ transition, location });
  }
}

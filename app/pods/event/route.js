import ModalRoute from 'interflux/pods/components/modal/route';

export default class EventRoute extends ModalRoute {
  model(params) {
    return {
      event: this.store.peekRecord('event', params.event_id)
    };
  }

  afterModel(model) {
    if (!model.event) {
      console.warn('redirecting back to contact page');
      this.router.transitionTo('index');
    }
  }

  // Properties on controllers will linger when switching between models.
  // To avoid, we reset them each time the route is exited.
  // https://api.emberjs.com/ember/3.24/classes/Route/methods?anchor=resetController
  resetController(controller, isExiting, transition) {
    if (isExiting && transition.targetName !== 'error') {
      // TBC
      // controller.set('query', null);
    }
  }
}

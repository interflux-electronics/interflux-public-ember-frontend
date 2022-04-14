import ModalRoute from 'interflux/pods/components/modal/route';
import { inject as service } from '@ember/service';

export default class DocumentCategoryRoute extends ModalRoute {
  @service router;
  @service store;
  @service modal;
  @service window;
  @service document;

  model(params) {
    return {
      category: this.store
        .peekAll('documentCategory')
        .findBy('slug', params.category)
    };
  }

  afterModel(model) {
    if (!model.category) {
      console.warn('redirecting back to documents page');
      this.router.transitionTo('documents');
    }
  }

  // Properties on controllers will linger when switching between models.
  // To avoid, we reset them each time the route is exited.
  // https://api.emberjs.com/ember/3.24/classes/Route/methods?anchor=resetController
  resetController(controller, isExiting, transition) {
    if (isExiting && transition.targetName !== 'error') {
      controller.set('query', null);
    }
  }
}

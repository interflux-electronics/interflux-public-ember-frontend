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
}

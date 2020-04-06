import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DocumentCategoryRoute extends Route {
  @service store;

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
      this.transitionTo('documents');
    }
  }
}

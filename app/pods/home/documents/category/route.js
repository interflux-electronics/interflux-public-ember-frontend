import BaseRoute from 'interflux/pods/base/route';
import { inject as service } from '@ember/service';

export default class DocumentCategoryRoute extends BaseRoute {
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

  renderTemplate() {
    this.render({
      into: 'application',
      outlet: 'modal'
    });
  }

  // Prevent <main> page from scrolling
  activate() {
    this.modal.setProperties({
      showModal: true,
      pageScrollY:
        this.window.pageYOffset() || this.document.documentElement.scrollTop
    });
    this.window.scrollTo(0, 0);
  }

  // Allow <main> page to scroll again
  deactivate() {
    const { pageScrollY } = this.modal;
    this.modal.setProperties({
      showModal: false,
      pageScrollY: 0
    });
    this.window.scrollTo(0, pageScrollY);
  }
}

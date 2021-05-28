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
      active: true,
      scroll:
        this.window.pageYOffset() || this.document.documentElement.scrollTop
    });
    this.window.scrollTo(0, 0);
  }

  // Allow <main> page to scroll again
  deactivate() {
    const scroll = this.modal.scroll;
    this.modal.setProperties({
      active: false,
      scroll: 0
    });
    this.window.scrollTo(0, scroll);
  }
}

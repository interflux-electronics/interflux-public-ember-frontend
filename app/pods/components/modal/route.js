import BaseRoute from 'interflux/pods/base/route';
import { inject as service } from '@ember/service';

export default class ModalRoute extends BaseRoute {
  @service modal;

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
      pageScrollY: window.pageYOffset || document.documentElement.scrollTop
    });
    window.scrollTo(0, 0);
  }

  // Allow <main> page to scroll again
  deactivate() {
    this.modal.setProperties({
      showModal: false,
      pageScrollY: 0
    });
    const scroll = this.modal.pageScrollY;
    window.scrollTo(0, scroll);
  }
}

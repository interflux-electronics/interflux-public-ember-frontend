import BaseRoute from 'interflux/pods/base/route';
import { inject as service } from '@ember/service';

export default class ModalRoute extends BaseRoute {
  @service modal;

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
    const scroll = this.modal.pageScrollY;
    this.modal.setProperties({
      showModal: false,
      pageScrollY: 0
    });
    window.scrollTo(0, scroll);
  }
}

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';

export default class PageComponent extends Component {
  @service modal;

  get pageClasses() {
    return this.modal.showModal ? 'no-scroll' : 'scrollable';
  }

  get pageStyle() {
    return this.modal.showModal
      ? htmlSafe(`top: -${this.modal.pageScrollY}px`)
      : null;
  }
}

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';

export default class ApplicationController extends Controller {
  @service header;
  @service modal;

  get pageClasses() {
    return this.modal.active ? 'no-scroll' : 'scrollable';
  }

  get pageStyle() {
    if (!this.modal.active) {
      return null;
    }
    return htmlSafe(`top: -${this.modal.scroll}px`);
  }
}

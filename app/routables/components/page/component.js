import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default class PageComponent extends Component {
  @service modal;

  @computed('modal.scroll')
  get safeStyle() {
    return htmlSafe(`top: -${this.modal.scroll}px`);
  }
}

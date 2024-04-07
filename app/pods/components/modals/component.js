import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ModalsComponent extends Component {
  @service modal;

  @action
  onInsert(element) {
    this.modal.parent = element;
  }
}

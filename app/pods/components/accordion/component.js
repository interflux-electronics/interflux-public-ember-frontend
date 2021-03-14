import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class AccordionComponent extends Component {
  // @arg sections;

  ul;

  @action
  onInsert(element) {
    this.ul = element;
  }

  @action
  onButtonClick(i) {
    const li = this.ul.querySelectorAll('li.section')[i];
    if (li.classList.contains('expanded')) {
      li.classList.remove('expanded');
    } else {
      li.classList.add('expanded');
    }
  }
}

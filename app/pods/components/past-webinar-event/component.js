import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';

export default class PastWebinarEventComponent extends Component {
  @service window;

  @tracked accordion;
  @tracked expanded = false;

  @action onInsertAccordion(div) {
    this.accordion = div;
  }

  @action toggleAccordion(event) {
    // Expand if collapsed et vice versa
    this.expanded = !this.expanded;

    // Remove focus from the toggle button
    event.currentTarget.blur();
  }

  get contentHeight() {
    return this.accordion.querySelector('.content').offsetHeight;
  }

  get accordionStyle() {
    const style = this.expanded
      ? `height: ${this.contentHeight}px;`
      : `height: 0;`;

    return htmlSafe(style);
  }
}

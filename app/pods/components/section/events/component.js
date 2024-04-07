import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class EventsComponent extends Component {
  @service modal;

  get view() {
    if (this.args.loading) {
      return 'loading';
    }

    return this.args.events?.length ? 'has-events' : 'no-events';
  }

  collapseSiblings(event) {
    const clickedSummary = event.currentTarget;
    const openDetails = document.querySelectorAll('details[open]');
    openDetails.forEach((details) => {
      const summary = details.querySelector('summary');
      if (summary !== clickedSummary) {
        details.removeAttribute('open');
      }
    });
  }

  get sortedEvents() {
    return this.args.events.sortBy('startDate').rejectBy('hasEnded');
  }
}

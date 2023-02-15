import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class EventsComponent extends Component {
  @service cache;
  @service store;

  @tracked events;
  @tracked view = 'loading';

  constructor() {
    super(...arguments);
    this.loadEvents();
  }

  loadEvents() {
    if (this.cache.events) {
      this.events = this.cache.events;
      this.view = 'has-events';
      return;
    }

    this.store
      .query('event', {
        include: 'country'
      })
      .then((events) => {
        this.cache.events = events;
        this.events = events;
        this.view = events.length > 0 ? 'has-events' : 'no-events';
      })
      .catch((error) => {
        this.view = 'no-events';
        console.error(error);
      });
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
    return this.events.sortBy('startDate').rejectBy('hasEnded');
  }
}

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class EventsComponent extends Component {
  @service cache;
  @service store;

  @tracked events;

  constructor() {
    super(...arguments);
    this.loadEvents();
  }

  async loadEvents() {
    if (this.cache.events) {
      this.events = this.cache.events;
      return;
    }
    const events = await this.store.findAll('event');
    this.cache.events = events;
    this.events = events;
  }
}

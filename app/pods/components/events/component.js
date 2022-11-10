import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class EventsComponent extends Component {
  @service cache;
  @service store;

  constructor() {
    super(...arguments);

    this.loadEvents();
  }

  async loadEvents() {
    this.events = this.cache.events || (await this.store.findAll('event'));
  }

  @tracked events;

  get eventssss() {
    return [
      {
        date: '28 Oct 2022',
        title: 'Ersa soldering technology seminar',
        location: 'Munich, Germany',
        cta: 'meet Steven Teliszewski'
      },
      {
        date: '12 – 14 Nov 2022',
        title: 'Matalec',
        location: 'Madrid, Spain',
        cta: 'meet Interflux at boot B302'
      },
      {
        date: '6 Dec 2022',
        title: 'Electronex',
        location: 'Melbourne, Australia',
        cta: 'meet Oritech at stand 24'
      },
      {
        date: '28 Oct 2022',
        title: 'Ersa soldering technology seminar',
        location: 'Munich, Germany',
        cta: 'meet Steven Teliszewski'
      },
      {
        date: '12 – 14 Nov 2022',
        title: 'Matalec',
        location: 'Madrid, Spain',
        cta: 'meet Interflux at boot B302'
      },
      {
        date: '6 Dec 2022',
        title: 'Electronex',
        location: 'Melbourne, Australia',
        cta: 'meet Oritech at stand 24'
      },
      {
        date: '28 Oct 2022',
        title: 'Ersa soldering technology seminar',
        location: 'Munich, Germany',
        cta: 'meet Steven Teliszewski'
      },
      {
        date: '12 – 14 Nov 2022',
        title: 'Matalec',
        location: 'Madrid, Spain',
        cta: 'meet Interflux at boot B302'
      },
      {
        date: '6 Dec 2022',
        title: 'Electronex',
        location: 'Melbourne, Australia',
        cta: 'meet Oritech at stand 24'
      }
    ];
  }
}

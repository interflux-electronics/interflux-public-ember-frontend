import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class WebinarsController extends Controller {
  @tracked loading = true;

  get upcomingWebinars() {
    return this.model.webinars.filterBy('isUpcoming');
  }

  get pastWebinars() {
    return this.model.webinars.rejectBy('isUpcoming');
  }

  get noUpcoming() {
    return this.upcomingWebinars.length === 0;
  }
}

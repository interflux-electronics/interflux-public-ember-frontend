import Controller from '@ember/controller';

export default class WebinarsController extends Controller {
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

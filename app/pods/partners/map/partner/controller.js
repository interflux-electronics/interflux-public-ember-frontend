import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PartnerController extends Controller {
  @service mapbox;
  @service window;

  get company() {
    return this.model.company;
  }

  @action
  onInsert() {
    this.waitForMapBoxReady();
  }

  async waitForMapBoxReady() {
    let ready = false;

    while (!ready) {
      if (this.mapbox.map) {
        ready = true;
        this.animateToCompanyMarker();
      }
      await this.window.delay(100);
    }
  }

  animateToCompanyMarker() {
    this.mapbox.map.easeTo({
      center: { lon: this.company.longitude, lat: this.company.latitude },
      zoom: 11,
      duration: 5000
    });
  }
}

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ContactController extends Controller {
  // @model company
  // @model companies
  // @model countries

  @service window;

  @action onInsertMap() {
    console.debug('map inserted');
    this.waitForMapBoxIsReady();
  }

  async waitForMapBoxIsReady() {
    let ready = false;

    while (!ready) {
      console.debug(window.mapboxgl);
      if (window.mapboxgl) {
        ready = true;
        this.renderMap();
      }
      await this.window.delay(100);
    }
  }

  async renderMap() {
    console.debug('render map');

    window.mapboxgl.accessToken =
      'pk.eyJ1IjoianctZmxvYXRwbGFuZS1kZXYiLCJhIjoiY2s4bW02N3UyMG93MTNycGduNzJqOGt6OCJ9.PHUKAn3CMmN73tmJXpa0ug';

    const { company, companies } = this.model;

    const center = company
      ? { lon: company.longitude, lat: company.latitude }
      : { lon: 20, lat: 30 };

    const map = new window.mapboxgl.Map({
      container: 'mapbox',
      style: 'mapbox://styles/jw-floatplane-dev/ck8mcsfr50uwe1iohs6xv6n0d',
      center,
      zoom: 2
    });

    companies.map((company) => {
      console.log(company.businessName);
      console.log(company.latitude);
      console.log(company.longitude);

      new window.mapboxgl.Marker()
        .setLngLat({ lon: company.longitude, lat: company.latitude })
        .addTo(map);
    });

    // Create a default Marker and add it to the map.
    // const marker1 = new window.mapboxgl.Marker()
    //   .setLngLat([12.554729, 55.70651])
    //   .addTo(map);

    // Create a default Marker, colored black, rotated 45 degrees.
    // const marker2 = new window.mapboxgl.Marker({ color: 'black', rotation: 45 })
    //   .setLngLat([12.65147, 55.608166])
    //   .addTo(map);
  }
}

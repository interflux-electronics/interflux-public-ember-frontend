import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PartnersMapController extends Controller {
  // @model countries
  // @model companies
  // @model slug

  @service mapbox;
  @service window;

  get countries() {
    return this.model.countries;
  }

  get companies() {
    return this.model.companies;
  }

  get company() {
    return this.companies.find((c) => c.slug === this.model.slug);
  }

  @action onInsertMap() {
    console.debug('inserted map');
    this.waitForMapBoxReady();
  }

  async waitForMapBoxReady() {
    let ready = false;

    while (!ready) {
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

    this.mapbox.map = new window.mapboxgl.Map({
      container: 'mapbox',
      style: 'mapbox://styles/jw-floatplane-dev/ck8mcsfr50uwe1iohs6xv6n0d',
      center,
      zoom: 2
    });

    const nav = new window.mapboxgl.NavigationControl({
      visualizePitch: false,
      showCompass: false,
      showZoom: true
    });
    this.mapbox.map.addControl(nav, 'bottom-right');

    companies.map((company) => {
      const marker = document.querySelector(`#marker-for-${company.slug}`);
      const shadow = document.querySelector(`#shadow-for-${company.slug}`);

      new window.mapboxgl.Marker({ anchor: 'bottom', element: shadow })
        .setLngLat({ lon: company.longitude, lat: company.latitude })
        .addTo(this.mapbox.map);

      new window.mapboxgl.Marker({ anchor: 'bottom', element: marker })
        .setLngLat({ lon: company.longitude, lat: company.latitude })
        .addTo(this.mapbox.map);
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

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PartnersMapController extends Controller {
  @service mapbox;
  @service router;
  @service window;

  queryParams = ['show'];

  @tracked show = null;

  get countries() {
    return this.model.countries;
  }

  get companies() {
    return this.model.companies;
  }

  get company() {
    return this.show ? this.companies.find((c) => c.slug === this.show) : null;
  }

  @action
  hideCompany() {
    this.zoomOutFromCompany(this.company);
    this.show = null;
  }

  @action
  onInsertMap() {
    console.debug('inserted map');
    this.waitForMapBoxReady();
  }

  @action
  onMarkerClick(company, event) {
    console.debug('onMarkerClick');
    this.centerOnCompanyAndZoomIn(company);
    console.debug('transition');
    this.router.transitionTo('partners.map', {
      queryParams: { show: company.slug }
    });

    // Prevents map clicks from hiding the company before it showed.
    event.stopPropagation();
  }

  async waitForMapBoxReady() {
    let ready = false;

    while (!ready) {
      if (window.mapboxgl) {
        ready = true;
        this.renderMap();
        if (this.company) {
          this.centerOnCompanyAndZoomIn(this.company);
        }
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
      zoom: 3,
      maxZoom: 16,
      minZoom: 3,
      pitchWithRotate: false,
      touchPitch: false,
      touchZoomRotate: false
    });

    this.mapbox.map.on('click', () => {
      console.log('click');
      console.log(this.company);
      if (this.company) {
        console.log('HIDE');
        this.hideCompany();
      }
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

  centerOnCompanyAndZoomIn(company) {
    this.mapbox.map.easeTo({
      center: { lon: company.longitude, lat: company.latitude },
      offset: [60, 0],
      zoom: 11,
      duration: 2000
    });
  }

  zoomOutFromCompany(company) {
    this.mapbox.map.easeTo({
      center: { lon: company.longitude, lat: company.latitude },
      zoom: 5,
      duration: 2000
    });
  }
}

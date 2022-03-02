import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PartnersMapPageComponent extends Component {
  @service mapbox;
  @service router;
  @service window;

  get countries() {
    return this.args.countries;
  }

  get companies() {
    return this.args.companies;
  }

  get company() {
    return this.args.show
      ? this.companies.find((c) => c.slug === this.args.show)
      : null;
  }

  @action
  hideCompany() {
    this.zoomOutFromCompany(this.company);
    this.router.transitionTo('partners.map', {
      queryParams: { show: null }
    });
  }

  @action
  onInsertMap() {
    this.waitForMapBoxReady();
  }

  @action
  onMarkerClick(company, event) {
    this.centerOnCompanyAndZoomIn(company);
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
    window.mapboxgl.accessToken =
      'pk.eyJ1IjoianctZmxvYXRwbGFuZS1kZXYiLCJhIjoiY2s4bW02N3UyMG93MTNycGduNzJqOGt6OCJ9.PHUKAn3CMmN73tmJXpa0ug';

    const { company, companies } = this;

    const center = company
      ? { lon: company.longitude, lat: company.latitude }
      : { lon: 20, lat: 30 };

    this.mapbox.map = new window.mapboxgl.Map({
      container: 'mapbox',
      style: 'mapbox://styles/jw-floatplane-dev/ck8mcsfr50uwe1iohs6xv6n0d',
      center,
      zoom: 2,
      maxZoom: 16,
      minZoom: 2,
      pitchWithRotate: false,
      touchPitch: false,
      touchZoomRotate: false
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
  }

  centerOnCompanyAndZoomIn(company) {
    this.mapbox.map.easeTo({
      center: { lon: company.longitude, lat: company.latitude },
      offset: [235, 0],
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

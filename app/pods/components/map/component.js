// Documentation:
// https://docs.mapbox.com/mapbox-gl-js/api/
// https://github.com/kturney/ember-mapbox-gl/blob/master/API.md

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MapComponent extends Component {
  @service media;

  get initOptions() {
    const zoom = this.media.isMobile ? 0.3 : 1.7;

    return {
      style: 'mapbox://styles/jw-floatplane-dev/ck8mcsfr50uwe1iohs6xv6n0d',
      minZoom: '0',
      maxZoom: '24',
      interactive: !this.media.isMobile && this.media.isTablet,
      zoom,
      center: [67.5172053, 14.199253] // lng lat! (not lat lng)
    };
  }

  feature(coordinates) {
    return {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates
            }
          }
        ]
      }
    };
  }

  // Belgium 3.7924299 51.1185309
  // Singapore 103.8743572 1.3299741
  // Oritech 143.7932688, -37.5441551
  // Beijing 116.4170393 39.994355
  // Shanghai 121.415829, 31.165788
  //
  get sources() {
    const arr = [];
    this.args.markers.sortBy('latitude').forEach((m) => {
      console.log(m.latitude, m.longitude, m.businessName);
      const json = this.feature([m.longitude, m.latitude]); // lng lat! (not lat lng)
      arr.push(json);
    });

    // return [
    //   this.feature([3.7924299, 51.1185309]), // Belgium
    //   this.feature([103.8743572, 1.3299741]), // Singapore
    //   this.feature([143.7932688, -37.5441551]), // Oritech
    //   this.feature([116.4170393, 39.994355]), // Bejing
    //   this.feature([121.415829, 31.165788]) // Shanghai
    // ];

    return arr;
  }

  get sourceLayer() {
    const radius = this.media.isMobile ? 4 : 10;

    return {
      type: 'circle',
      paint: {
        'circle-color': '#ff7300',
        'circle-radius': radius
      }
    };
  }

  @action
  mapLoaded(obj) {
    console.log('map loaded');
    console.log(obj);
  }

  @action
  mapClicked({ target: map, point }) {
    console.log('map clicked');
    console.log(map, point);
  }
}

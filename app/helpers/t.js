// Inspired from:
// https://www.appsloveworld.com/emberjs/100/4/how-to-inject-service-to-helper-after-a-promise-has-been-fulfilled

import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import ENV from 'interflux/config/environment';

export default class T extends Helper {
  @service translation;

  compute([english, locationBase, locationId]) {
    return ENV.isTest
      ? english
      : this.translation.t(english, locationBase, locationId);
  }
}

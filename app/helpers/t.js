// Inspired from:
// https://www.appsloveworld.com/emberjs/100/4/how-to-inject-service-to-helper-after-a-promise-has-been-fulfilled

import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class Translate extends Helper {
  @service i18n;

  compute([key]) {
    return this.i18n.t(key); // See i18n service
  }
}

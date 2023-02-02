// Inspired from:
// https://www.appsloveworld.com/emberjs/100/4/how-to-inject-service-to-helper-after-a-promise-has-been-fulfilled

import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class T extends Helper {
  @service i18n;

  compute([phrase, key]) {
    return this.i18n.translate(phrase, key); // See i18n service
  }
}

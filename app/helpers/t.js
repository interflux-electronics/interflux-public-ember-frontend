// Inspired from:
// https://www.appsloveworld.com/emberjs/100/4/how-to-inject-service-to-helper-after-a-promise-has-been-fulfilled

import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class Translate extends Helper {
  @service store;

  compute([key]) {
    const record = this.store.peekAll('translation').findBy('key', key);
    const translation = record?.value;

    if (!translation) {
      console.warn('missing translation for', key);
      // TODO: log this and show in admin
    }

    return translation;
  }
}

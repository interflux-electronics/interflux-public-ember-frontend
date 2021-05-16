import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class WindowService extends Service {
  @service fastboot;

  get isFastBoot() {
    return this.fastboot.isFastBoot;
  }

  documentElement() {
    if (this.isFastBoot) {
      return { scrollTop: 0 };
    }

    return document.documentElement;
  }
}

import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class WindowService extends Service {
  @service fastboot;

  get isFastBoot() {
    return this.fastboot.isFastBoot;
  }

  delay(ms) {
    if (this.isFastBoot) {
      return new Promise((approve) => {
        approve();
      });
    }

    return new Promise((approve) => {
      window.setTimeout(approve, ms);
    });
  }

  scrollTo(x, y) {
    if (this.isFastBoot) {
      return;
    }

    window.scrollTo(x, y);
  }

  devicePixelRatio() {
    if (this.isFastBoot) {
      return 1;
    }
    return window.devicePixelRatio || 1;
  }

  pageYOffset() {
    if (this.isFastBoot) {
      return 0;
    }

    return window.pageYOffset || 0;
  }
}

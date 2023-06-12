import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class DocumentService extends Service {
  @service fastboot;

  documentElement() {
    if (this.fastboot.isFastBoot) {
      return { scrollTop: 0 };
    }

    return document.documentElement;
  }
}

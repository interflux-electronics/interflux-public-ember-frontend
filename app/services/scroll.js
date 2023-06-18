import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ScrollService extends Service {
  listener;

  @service fastboot;

  @tracked lastY = 0;
  @tracked currentY = 0;

  get goingDown() {
    return this.currentY > this.lastY;
  }

  get goingUp() {
    return this.currentY < this.lastY;
  }

  constructor() {
    super(...arguments);

    if (this.fastboot.isFastBoot) {
      return;
    }

    this.listener = () => {
      this.lastY = this.currentY;
      this.currentY = window.pageYOffset || document.documentElement.scrollTop;
    };

    document.addEventListener('scroll', this.listener);
  }

  willDestroy() {
    super.willDestroy(...arguments);

    if (this.fastboot.isFastBoot) {
      return;
    }

    document.removeEventListener('scroll', this.listener);
  }
}

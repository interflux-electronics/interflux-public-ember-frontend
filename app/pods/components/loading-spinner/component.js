import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoadingSpinnerComponent extends Component {
  @service window;
  @service fastboot;

  @tracked side = 'front';

  constructor() {
    super(...arguments);

    this.startLoop();
  }

  async startLoop() {
    if (this.fastboot.isFastBoot) {
      return;
    }

    const array = ['bottom', 'top', 'right', 'left', 'back'].sort(function() {
      return 0.5 - Math.random();
    });
    // Make sure the first shown icon is shown at the end of the loop.
    array.push('front');

    let i = 0;

    while (i < 6) {
      await this.window.delay(1);
      this.side = array[i];
      i = i < 5 ? i + 1 : 0;
      await this.window.delay(1400);
    }
  }
}

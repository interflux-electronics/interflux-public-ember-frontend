import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class LoadingSpinnerComponent extends Component {
  @tracked side = 'front';

  constructor() {
    super(...arguments);

    this.startLoop();
  }

  delay(ms) {
    return new Promise(approve => {
      window.setTimeout(approve, ms);
    });
  }

  async startLoop() {
    const array = ['bottom', 'top', 'right', 'left', 'back'].sort(function() {
      return 0.5 - Math.random();
    });
    // Make sure the first shown icon is shown at the end of the loop.
    array.push('front');

    let i = 0;

    while (i < 6) {
      await this.delay(1400);
      this.side = array[i];
      i = i < 5 ? i + 1 : 0;
    }
  }
}

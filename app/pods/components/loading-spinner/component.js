import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

export default class LoadingSpinnerComponent extends Component {
  @service load;
  @tracked side = 'front';

  constructor() {
    super(...arguments);

    // this.sides = this.sides.sort(function() { return 0.5 - Math.random() });
    // this.side = this.sides

    this.loop.perform();
  }

  @task()
  *loop() {
    console.log('showing load spinner');

    const array = ['bottom', 'top', 'right', 'left', 'back', 'front'].sort(
      function() {
        return 0.5 - Math.random();
      }
    );

    let i = 0;

    while (true) {
      yield timeout(1200);
      this.side = array[i];
      i = i < 5 ? i + 1 : 0;
    }
  }
}

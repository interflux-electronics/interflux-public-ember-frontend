import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | home/processes/process', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:home/processes/process');
    assert.ok(route);
  });
});

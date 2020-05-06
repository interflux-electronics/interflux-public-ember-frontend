import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | home/processes', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:home/processes');
    assert.ok(route);
  });
});

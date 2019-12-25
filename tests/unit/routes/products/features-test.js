import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | products/features', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:products/features');
    assert.ok(route);
  });
});

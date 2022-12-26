import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | home/product-error', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:product-error');
    assert.ok(route);
  });
});

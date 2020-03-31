import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | language/products/family', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:language/products/family');
    assert.ok(route);
  });
});

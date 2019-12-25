import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | products/families/family', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:products/families/family');
    assert.ok(route);
  });
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | language/articles', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:language/articles');
    assert.ok(route);
  });
});
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | en/contact', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:en/contact');
    assert.ok(route);
  });
});

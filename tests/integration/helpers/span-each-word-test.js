import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | span-each-word', function (hooks) {
  setupRenderingTest(hooks);

  test('it wraps each word with a <span>', async function (assert) {
    assert.expect(1);
    this.set('string', 'We are rapt for wrapped words.');
    await render(hbs`{{span-each-word this.string}}`);
    assert.strictEqual(
      this.element.innerHTML,
      '<span>We</span><span>&nbsp;</span><span>are</span><span>&nbsp;</span><span>rapt</span><span>&nbsp;</span><span>for</span><span>&nbsp;</span><span>wrapped</span><span>&nbsp;</span><span>words.</span>'
    );
  });
});

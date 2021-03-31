import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | span-each-word', function(hooks) {
  setupRenderingTest(hooks);

  test('it wraps each word with a <span>', async function(assert) {
    assert.expect(2);
    this.set('string', 'We are rapt for wrapped words.');
    await render(hbs`{{span-each-word string}}`);
    assert.equal(this.element.innerText, 'We are rapt for wrapped words.');
    assert.equal(
      this.element.innerHTML,
      '<span>We</span> <span>are</span> <span>rapt</span> <span>for</span> <span>wrapped</span> <span>words.</span>'
    );
  });
});

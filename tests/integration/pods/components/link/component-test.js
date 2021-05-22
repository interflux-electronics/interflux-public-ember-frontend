import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | link', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <Link
        @label="ISO 9001"
        @url="https://www.iso.org/"
      />
    `);

    const a = this.element.querySelector('a');

    assert.equal(a.innerText, 'ISO 9001');
    assert.equal(a.getAttribute('href'), 'https://www.iso.org/');
    assert.equal(a.getAttribute('rel'), 'noopener noreferrer');
  });
});

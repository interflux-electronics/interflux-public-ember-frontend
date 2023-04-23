import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | language-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders 9 links', async function (assert) {
    assert.expect(1);

    await render(hbs`<LanguageList />`);

    const links = this.element.querySelectorAll('a');

    assert.equal(links.length, 5);
  });
});

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | flag', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('country', {
      id: 'FL',
      nameEnglish: 'FooLand',
      nameNative: 'BarLand'
    });

    await render(hbs`<Flag @country={{this.country}} />`);

    const img = this.element.querySelector('img.flag');

    assert.equal(img.src, 'http://localhost:9000/images/flags/FL.svg');
    assert.equal(img.alt, 'BarLand (FooLand)');
    assert.ok(img.classList.contains('fl'));
  });
});

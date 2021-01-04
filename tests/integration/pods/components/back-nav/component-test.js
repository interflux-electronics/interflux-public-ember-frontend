import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | back-nav', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`
      <BackNav
        @backRoute="home.products"
        @backLabel="All products"
      />
    `);

    const span = this.element.querySelector('a span');

    assert.equal(span.textContent, 'All products');
  });
});

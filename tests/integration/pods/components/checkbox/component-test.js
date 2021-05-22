import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | checkbox', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    this.set('id', '123');
    this.set('checked', true);

    await render(hbs`
      <Checkbox
        @id={{this.id}}
      />
    `);

    const checkbox = this.element.querySelector('[role="checkbox"]');

    assert.equal(checkbox.getAttribute('aria-labelledby'), 'input-123');
  });

  test('it toggles', async function (assert) {
    assert.expect(2);

    this.set('checked', true);
    this.set('toggle', () => {
      this.set('checked', !this.checked);
    });

    await render(hbs`
      <Checkbox
        @checked={{this.checked}}
        @onClick={{this.toggle}}
      />
    `);

    const checkbox = this.element.querySelector('[role="checkbox"]');

    assert.equal(checkbox.getAttribute('aria-checked'), 'true');

    await click('[role="checkbox"]');

    assert.equal(checkbox.getAttribute('aria-checked'), 'false');
  });
});

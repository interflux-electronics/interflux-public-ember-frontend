import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | product-row', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the headings and pitch', async function(assert) {
    assert.expect(4);

    this.set('product', {
      id: 'IF-2005M',
      name: 'IF 2005M',
      pitch: 'This is a **markdown** description.',
      family: {
        nameSingle: 'soldering flux'
      }
    });

    await render(hbs`
      <ProductRow
        @product={{this.product}}
      />
    `);

    const h3 = this.element.querySelector('.product-row h3');
    const h4 = this.element.querySelector('.product-row h4');
    const p = this.element.querySelector('.product-row .pitch p');
    const strong = this.element.querySelector('.product-row .pitch p strong');

    assert.equal(h3.innerText, 'IF 2005M');
    assert.equal(h4.innerText, 'soldering flux');
    assert.equal(p.innerText, 'This is a markdown description.');
    assert.equal(strong.innerText, 'markdown');
  });
});

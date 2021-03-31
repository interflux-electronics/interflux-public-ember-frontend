import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const onePair = 'Solid content: 5.3% +/- 0.5%';

const multiplePairs = `
Solid content: 5.3% +/- 0.5%
Halide content: 0.00%
`;

const multiplePairsWithList = `
Solid content: 5.3% +/- 0.5%
Halide content: 0.00%
Available alloys:
* SnCuAg
* SnPbAg
* SnPb
`;

const multiplePairsInvalidLines = `
Solid content: 5.3% +/- 0.5%

Halide content: 0.00%

Invalid

Available alloys:
* SnCuAg
* SnPbAg
* SnPb
- Bogus
`;

module('Integration | Helper | to-definition-list', function(hooks) {
  setupRenderingTest(hooks);

  test('it converts one key value pair', async function(assert) {
    assert.expect(1);
    this.set('string', onePair);
    await render(hbs`{{to-definition-list string}}`);
    assert.equal(
      this.element.innerHTML,
      '<dl><dt>Solid content</dt><dd>5.3% +/- 0.5%</dd></dl>'
    );
  });

  test('it converts multiple key value pairs', async function(assert) {
    assert.expect(1);
    this.set('string', multiplePairs);
    await render(hbs`{{to-definition-list string}}`);
    assert.equal(
      this.element.innerHTML,
      '<dl><dt>Solid content</dt><dd>5.3% +/- 0.5%</dd><dt>Halide content</dt><dd>0.00%</dd></dl>'
    );
  });

  test('it converts list items', async function(assert) {
    assert.expect(1);
    this.set('string', multiplePairsWithList);
    await render(hbs`{{to-definition-list string}}`);
    assert.equal(
      this.element.innerHTML,
      '<dl><dt>Solid content</dt><dd>5.3% +/- 0.5%</dd><dt>Halide content</dt><dd>0.00%</dd><dt>Available alloys</dt><dd><ul><li>SnCuAg</li><li>SnPbAg</li><li>SnPb</li></ul></dd></dl>'
    );
  });

  test('it filters out invalid lines', async function(assert) {
    assert.expect(1);
    this.set('string', multiplePairsInvalidLines);
    await render(hbs`{{to-definition-list string}}`);
    assert.equal(
      this.element.innerHTML,
      '<dl><dt>Solid content</dt><dd>5.3% +/- 0.5%</dd><dt>Halide content</dt><dd>0.00%</dd><dt>Available alloys</dt><dd><ul><li>SnCuAg</li><li>SnPbAg</li><li>SnPb</li></ul></dd></dl>'
    );
  });

  test('it gracefully handles undefined', async function(assert) {
    assert.expect(1);
    this.set('string', undefined);
    await render(hbs`{{to-definition-list string}}`);
    assert.equal(this.element.innerHTML, '<dl></dl>');
  });
});

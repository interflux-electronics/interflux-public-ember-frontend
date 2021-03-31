import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | accordion', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    this.set('sections', [
      {
        iconURL: 'leaves',
        buttonLabel: 'Button 1',
        textShownOnExpand: 'Content 1'
      },
      {
        iconURL: 'strong',
        buttonLabel: 'Button 2',
        textShownOnExpand: 'Content 2'
      }
    ]);

    await render(hbs`
      <Accordion @sections={{this.sections}} />
    `);

    const sections = this.element.querySelectorAll('ul li.section');

    assert.equal(sections.length, 2);
  });

  // TODO: test interaction
});

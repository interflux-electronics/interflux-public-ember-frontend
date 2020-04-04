import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
// import { htmlSafe } from '@ember/template';

export default class PageComponent extends Component {
  @service modal;

  // topStyle() {
  //   return htmlSafe(`top: ${escapeCSS(`-${this.modal.scroll}px`)}`);
  // }

  // https://deprecations.emberjs.com/v1.x/#toc_binding-style-attributes
  //   myStyle: Ember.computed('color', function() {
  //   /* Note: You must implement #escapeCSS. */
  //   var color = escapeCSS(this.get('color'));
  //   return Ember.String.htmlSafe("color: " + color);
  // })
}

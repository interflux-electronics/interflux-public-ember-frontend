import Component from '@ember/component';

export default Component.extend({
  elementId: 'index-page',

  *transition() {
    console.debug('index-page:', arguments[0]);
  }
});

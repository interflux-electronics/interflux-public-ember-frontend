import Component from '@ember/component';

export default Component.extend({
  classNames: ['hero-card'],

  duration: 1000,

  *transition() {
    console.debug('product-card:', arguments[0]);
  }
});

import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['random-image'],

  i: computed(function() {
    return Math.floor(Math.random() * 14) + 1;
  })
});

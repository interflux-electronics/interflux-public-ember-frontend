// Inspired from:
// https://codepen.io/aaroniker/pen/omvYNZ
// https://codepen.io/tashfene/pen/raEqrJ/
// https://codepen.io/Volorf/pen/KbbRbZ
// https://codepen.io/chrisgannon/pen/jLVwxZ
// https://codepen.io/jpanter/pen/PWWQXK/
// https://codepen.io/iGadget/pen/aZmEGR/
// https://freefrontend.com/css-loaders/

import Component from '@ember/component';
import { equal } from '@ember/object/computed';

export default Component.extend({
  tagName: 'i',
  classNames: ['load-spinner'],

  isCircle: equal('icon', 'circle'),
  isTriangle: equal('icon', 'triangle'),
  isSquare: equal('icon', 'square'),
  isCup: equal('icon', 'cup')
});

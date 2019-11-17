// Out of the box Ember
//
// 'use strict';
//
// const browsers = [
//   'last 1 Chrome versions',
//   'last 1 Firefox versions',
//   'last 1 Safari versions'
// ];
//
// const isCI = !!process.env.CI;
// const isProduction = process.env.EMBER_ENV === 'production';
//
// if (isCI || isProduction) {
//   browsers.push('ie 11');
// }
//
// module.exports = {
//   browsers
// };

// As suggested by Corber
// http://corber.io/pages/frameworks/ember#configuring-browser-targets

'use strict';

let browsers;

if (process.env.CORBER) {
  browsers = [`last 1 ${process.env.CORBER_PLATFORM} versions`];
} else {
  // out-of-the-box ember-cli behaviour
  browsers = [
    'last 1 Chrome versions',
    'last 1 Firefox versions',
    'last 1 Safari versions'
  ];

  const isCI = !!process.env.CI;
  const isProduction = process.env.EMBER_ENV === 'production';

  if (isCI || isProduction) {
    browsers.push('ie 11');
  }
}

module.exports = {
  browsers
};

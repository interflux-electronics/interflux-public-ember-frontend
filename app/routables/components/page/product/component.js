import Page from '../component';
import resize from 'ember-animated/motions/resize';
import move from 'ember-animated/motions/move';
import adjustCSS from 'ember-animated/motions/adjust-css';
// import { wait } from 'ember-animated';

export default Page.extend({
  elementId: 'product-page',

  duration: 1000,

  *transition({ receivedSprites, duration }) {
    console.debug('product-page:', arguments[0]);

    const d = duration * 0.5;

    receivedSprites.forEach(sprite => {
      resize(sprite, { duration: d });
      move(sprite, { duration: d });
      adjustCSS('font-size', sprite, { duration: d });

      sprite.applyStyles({
        zIndex: 1
      });
    });
  }
});

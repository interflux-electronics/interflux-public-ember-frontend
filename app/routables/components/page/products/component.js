import Page from '../component';
import resize from 'ember-animated/motions/resize';
import move from 'ember-animated/motions/move';
import adjustCSS from 'ember-animated/motions/adjust-css';
import { fadeOut } from 'ember-animated/motions/opacity';
// import { wait } from 'ember-animated';

export default Page.extend({
  elementId: 'products',

  duration: 1000,

  *transition({ receivedSprites, removedSprites, duration }) {
    console.debug('products-index-page:', arguments[0]);

    const d = duration * 0.5;

    receivedSprites.forEach(sprite => {
      resize(sprite, { duration: d });
      move(sprite, { duration: d });
      adjustCSS('font-size', sprite, { duration: d });

      sprite.applyStyles({
        zIndex: 1
      });
    });

    removedSprites.forEach(sprite => {
      fadeOut(sprite, { duration: 0.5 * duration });
    });
  }
});

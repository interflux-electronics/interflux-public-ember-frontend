import Component from '@ember/component';
import { fadeIn } from 'ember-animated/motions/opacity';
import { wait } from 'ember-animated';

export default Component.extend({
  classNames: ['animate'],

  *fade({ receivedSprites, duration }) {
    console.debug('fade:', arguments[0]);

    receivedSprites.forEach(sprite => {
      sprite.moveToFinalPosition();
      sprite.applyStyles({
        opacity: 0
      });
    });

    yield wait(duration * 0.5);

    receivedSprites.forEach(sprite => {
      fadeIn(sprite, { from: 0 });
    });
  }
});

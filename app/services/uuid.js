import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class UuidService extends Service {
  @service fastboot;

  // Generates UUID v4
  // Inspired from:
  // https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
  generate() {
    let d = new Date().getTime();
    let d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16;

      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }

      return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16);
    });
  }
}

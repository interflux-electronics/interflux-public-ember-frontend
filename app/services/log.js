import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  console: service(),
  // sentry: service(),

  error(msg) {
    this.console.error(msg);
    // this.sentry.log(msg);
  },

  warning(msg) {
    this.console.warn(msg);
    // this.sentry.log(msg);
  }
});

import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class LogService extends Service {
  @service console;
  // @service sentry;

  error(msg) {
    this.console.error(msg);
    // this.sentry.log(msg);
  }

  warning(msg) {
    this.console.warn(msg);
    // this.sentry.log(msg);
  }
}

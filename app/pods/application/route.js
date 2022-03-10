import BaseRoute from 'interflux/pods/base/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends BaseRoute {
  @service store;
  @service session;
  @service translation;

  beforeModel() {
    this.session.create();
  }

  model() {
    this.translation.languages.forEach((language) => {
      this.store.createRecord('language', language);
    });
  }
}

import BaseRoute from 'interflux/pods/base/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends BaseRoute {
  @service translation;
  @service store;

  beforeModel() {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    if (name && email) {
      window.LiveChatWidget.call('set_customer_name', name);
      window.LiveChatWidget.call('set_customer_email', email);
    }
  }

  model() {
    this.translation.languages.forEach((language) => {
      this.store.createRecord('language', language);
    });
  }
}

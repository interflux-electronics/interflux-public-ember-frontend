import BaseRoute from 'interflux/pods/base/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends BaseRoute {
  @service store;
  @service session;
  @service translation;

  beforeModel() {
    this.session.create();

    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    if (name && email && window.LiveChatWidget) {
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

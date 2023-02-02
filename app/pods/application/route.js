import BaseRoute from 'interflux/pods/base/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends BaseRoute {
  @service session;
  @service page;

  activate() {
    this.page.update({
      id: 'application',
      showLoading: true
    });
  }

  beforeModel() {
    // TODO: review
    // this.session.create();
  }
}

import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class ApplicationRoute extends BaseRoute {
  activate() {
    super.activate();
    this.page.update({
      id: 'application',
      title: 'Loading ...',
      showLoading: true
    });
  }

  model() {
    const language = this.translation.language;

    // If English, do not load UI translations.
    if (language === 'en') {
      return {};
    }

    if (this.cachedPayload) {
      return this.cachedPayload;
    }

    const payload = {
      translations: this.store.query('translation', {
        filter: { language }
      })
    };

    // TODO: make translations non-blocking when pre-rendered?
    // return this.serverSideRendered ? payload : hash(payload);

    return hash(payload);
  }

  afterModel() {
    super.activate();

    this.page.update({
      showLoading: true
    });
  }
}

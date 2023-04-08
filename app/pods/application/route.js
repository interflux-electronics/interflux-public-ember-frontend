import BaseRoute from 'interflux/pods/base/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class ApplicationRoute extends BaseRoute {
  @service page;
  @service session;
  @service translation;

  activate() {
    this.page.update({
      id: 'application',
      showLoading: true
    });
  }

  model() {
    const language = this.translation.language;

    // If English, do not load UI translations.
    if (language === 'en') {
      return {};
    }

    // For all other languages, load the UI translations.
    return hash({
      translations:
        this.cache[`translations-${language}`] ||
        this.store.query('translation', {
          filter: { language }
        })
      // error: new Promise((resolve, reject) => setTimeout(reject, 1 * 1000))
      // delay: new Promise((resolve) => setTimeout(resolve, 3 * 1000))
    });
  }

  afterModel(model) {
    const language = this.translation.language;
    this.cache[`translations-${language}`] = model.translations;
    this.page.update({
      showLoading: true
    });
  }
}

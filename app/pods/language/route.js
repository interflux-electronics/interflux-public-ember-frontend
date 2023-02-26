import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class LanguageRoute extends BaseRoute {
  model(params) {
    const language = params.language;

    console.debug('------');
    console.debug('setting language ...');
    console.debug({ language });

    // Important: here we set the language of the website.
    // The URL is the only thing which decides the language shown.
    this.translation.language = language;

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

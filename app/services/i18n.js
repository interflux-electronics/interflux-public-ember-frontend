import Service from '@ember/service';
import ENV from 'interflux/config/environment';
import { inject as service } from '@ember/service';

export default class I18nService extends Service {
  @service store;

  t(key) {
    const record = this.store.peekAll('translation').findBy('key', key);

    if (!record) {
      console.warn('no translation record found for ', key);
      this.report(key);

      return '';
    }

    // Happy path, translation found
    if (record.native) {
      return record.native;
    }

    // Fall back on English if no translation is found (is better than showing nothing)
    if (record.english) {
      console.warn(`no native translation for ${key}.`);
      console.warn(`falling back on English...`);
      this.report(key);

      return record.english;
    }

    console.warn(`no native nor English translation for ${key}`);
    this.report(key);

    return '';
  }

  report(key) {
    const locale = ENV.locale;
    console.warn(`TODO: report issue in Admin`, key, locale);
  }
}

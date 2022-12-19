import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class I18nService extends Service {
  @service store;

  t(key) {
    const record = this.store.peekAll('translation').findBy('key', key);
    const translation = record?.value;

    if (!translation) {
      console.warn('missing translation for', key);
      // TODO: log this and show in admin
    }

    return translation;
  }
}

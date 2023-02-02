import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class I18nService extends Service {
  @service api;
  @service router;
  @service store;

  @tracked language;

  translate(phrase) {
    const { language } = this;
    const route = this.router.currentRoute.name;

    if (!phrase) {
      console.error(`${language} | ${route} | ${phrase} | no phrase`);
      return;
    }

    if (!language) {
      console.error(`${language} | ${route} | ${phrase} | no language`);
      return;
    }

    if (language === 'en') {
      console.debug(`${language} | ${route} | ${phrase} | is English`);
      return phrase;
    }

    const record = this.store.peekAll('translation').findBy('english', phrase);

    if (!record) {
      console.warn(`${language} | ${route} | ${phrase} | no record 🔥`);

      this.creatMissingTranslation(language, route, phrase);

      return phrase;
    }

    if (!record.native) {
      console.warn(`${language} | ${route} | ${phrase} | no translation 🔥`);

      // this.taskRobotTranslation(language, route, phrase);

      return phrase;
    }

    console.debug(`translated 👍🏼`);

    return record.native;
  }

  // HACK: for some reason we're unable to create records using the Ember store
  // and thus we fall back on doing a POST with native fetch().
  async creatMissingTranslation(language, location, english) {
    const url = `${this.api.host}/${this.api.namespace}/translations`;
    const request = new Request(url, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers(this.api.headers),
      body: JSON.stringify({
        data: { attributes: { language, location, english } }
      })
    });

    fetch(request)
      .then((response) => response.json())
      .then((response) => {
        const id = response.data?.id;

        if (!id) {
          console.error(`could not create translation record`);
          console.error(response);
          return;
        }

        console.debug(`record created 👍🏼 ${response?.data?.id}`);
      })
      .catch((response) => {
        console.error('failed to create translation');
        console.error(response);
      });
  }

  // @tracked loaded = [];

  // retrieveTranslations(location) {
  //   console.debug('------');
  //   console.debug('retrieveTranslations()', location);

  //   const { language, loaded } = this;

  //   if (language === 'en') {
  //     console.debug('exit, language is English');
  //     return {};
  //   }

  //   if (this.loaded.includes(location)) {
  //     console.debug('exit, already loaded');
  //     return {};
  //   }

  //   const success = () => {
  //     console.debug('success');
  //     loaded.push(location);
  //     this.loaded = loaded;
  //   };

  //   const fail = (response) => {
  //     console.error('fail');
  //     console.error(response);
  //   };

  //   console.debug('loading...');

  //   // To use regexes:
  //   // filter: { language, key: '~^ui.' }
  //   // filter: { language, key: '~^header\.|^footer\.' }

  //   return this.store
  //     .query('translation', {
  //       filter: { language, location }
  //     })
  //     .then(success)
  //     .catch(fail);
  // }

  // translate(phrase, key) {
  //   if (!phrase) {
  //     console.error(`could not translate "${phrase}" (${key}) – no phrase`);
  //     return;
  //   }

  //   if (!key) {
  //     console.error(`could not translate "${phrase}" (${key}) – no key`);
  //     return;
  //   }

  //   const { language } = this;

  //   if (!language) {
  //     console.error(`could not translate "${phrase}" (${key}) – no language`);
  //     return;
  //   }

  //   if (language === 'en') {
  //     console.debug(`not translating, language is English`);
  //     return phrase;
  //   }

  //   const record = this.store.peekAll('translation').findBy('english', phrase);

  //   if (!record) {
  //     console.warn(`no translation record for "${phrase}" (${key}) 🔥`);

  //     // this.creatMissingTranslation(key, language, phrase);

  //     return phrase;
  //   }

  //   if (!record.native) {
  //     console.warn(`no native translation for "${phrase}" (${key}) 🔥`);

  //     // TODO: this.notifyMissingTranslation();

  //     return phrase;
  //   }

  //   console.debug(`translated "${phrase}" (${key}) 👍🏼`);

  //   return record.native;
  // }

  // HACK: for some reason we're unable to create records using the Ember store
  // and thus we fall back on doing a POST with native fetch().
  // async notifyMissingTranslation(phrase, key) {
  //   const url = `${this.api.host}/${this.api.namespace}/translation-events`;
  //   const request = new Request(url, {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: new Headers(this.api.headers),
  //     body: JSON.stringify({
  //       code: 'user-saw-missing-translation',
  //       language: this.language,
  //       english: phrase,
  //       key
  //     })
  //   });
  //   const response = await fetch(request).catch((error) => {
  //     return console.error(error);
  //   });
  //   console.log(response);
  // }
}

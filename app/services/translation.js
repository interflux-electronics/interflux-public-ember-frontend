import ENV from 'interflux/config/environment';
import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class TranslationService extends Service {
  @service api;
  @service store;

  // The current language of the website representad as a 2 letter code.
  // The language is set as an environment variable and will vary per domain.
  //
  // interflux.com = en
  // interflux.de = de
  // interflux.fr = fr
  // interflux.es = es
  // interflux.mx = es
  //
  get language() {
    return ENV.LANGUAGE;
  }

  // This method translates the given phrase to shown language.
  t(english, locationBase, locationId) {
    const { language } = this;

    if (!language) {
      console.error('ENV.LANGUAGE is not set');
      return english;
    }

    if (language === 'en') {
      return english;
    }

    if (!english) {
      console.error(`t() no english passed in | ${location}`);
      return '?';
    }

    if (!locationBase) {
      console.error(`t() no locationBase passed in | ${english}`);
      return english;
    }

    const location = locationId
      ? `${locationBase}.${locationId}`
      : locationBase;

    const record = this.store
      .peekAll('translation')
      .filterBy('language', language)
      .findBy('location', location);

    if (!record) {
      console.warn(`t() no record for "${language}" on "${location}" 🔥`);
      console.warn('creating missing translation...');
      this.creatMissingTranslation(language, location, english);
      return english;
    }

    if (!record.native) {
      console.warn(`t() no translation for "${language}" on "${location}" 🔥`);
      return english;
    }

    const englishBefore = record.english;
    const englishNow = english;

    if (englishBefore !== englishNow) {
      console.warn(
        `t() english changed from "${englishBefore}" to "${english}" for "${language}" on "${location}" 🔥`
      );
      if (record.status !== 'to-update') {
        console.warn('t() marking translation as outdated...');
        this.updateEnglish(record, englishBefore, englishNow);
      }
    }

    return record.native;
  }

  // NOTE: for some reason we're unable to create records using the Ember store
  // and thus we fall back on doing a POST with native fetch().

  async creatMissingTranslation(language, location, english) {
    // TODO: test fetch() in Fastboot
    // if (this.fastboot.isFastBoot) {
    //   return;
    // }
    console.warn('skip translation creation');
    return;
    // const url = `${this.api.host}/${this.api.namespace}/translations`;
    // const request = new Request(url, {
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: new Headers(this.api.headers),
    //   body: JSON.stringify({
    //     data: {
    //       attributes: {
    //         language,
    //         location,
    //         english,
    //         status: 'to-translate'
    //       }
    //     }
    //   })
    // });

    // fetch(request)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.warn('create succeeded');
    //     console.warn(response);
    //   })
    //   .catch((response) => {
    //     console.error('create failed');
    //     console.error(response);
    //   });
  }

  async updateEnglish(record, englishBefore, englishNow) {
    const url = `${this.api.host}/${this.api.namespace}/translations/${record.id}`;
    const request = new Request(url, {
      method: 'PATCH',
      mode: 'cors',
      headers: new Headers(this.api.headers),
      body: JSON.stringify({
        data: {
          attributes: {
            english: englishNow,
            englishBefore,
            status: 'to-update'
          }
        }
      })
    });

    fetch(request)
      .then((response) => {
        if (response.status === 204) {
          console.debug('update succeeded');
          console.debug(response);
        } else {
          console.warn('update failed (not 204)');
          console.warn(response);
        }
      })
      .catch((response) => {
        console.error('update failed');
        console.error(response);
      });
  }
}

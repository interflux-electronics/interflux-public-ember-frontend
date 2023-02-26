import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class TranslationService extends Service {
  @service api;
  @service store;

  // The language in which the website is currently being shown.
  // en, de, es, fr
  @tracked language;

  // This method translates the given phrase to shown language.
  t(english, location) {
    const { language } = this;
    const base = `${language} | ${location} | ${english}`;

    if (!english) {
      console.error(`${base} | no english`);
      return '?';
    }

    if (!language) {
      console.error(`${base} | no language`);
      return english;
    }

    if (!location) {
      console.error(`${base} | no location`);
      return english;
    }

    if (language === 'en') {
      console.debug(`${base} | is English, no translation needed`);
      return english;
    }

    const record = this.store
      .peekAll('translation')
      .filterBy('language', language)
      .findBy('location', location);

    if (!record) {
      console.warn(`${base} | no record 🔥`);
      this.creatMissingTranslation(language, location, english);
      return english;
    }

    if (!record.native) {
      console.warn(`${base} | no native 🔥`);
      return english;
    }

    const englishBefore = record.english;
    const englishNow = english;

    if (englishBefore !== englishNow) {
      console.warn(`${base} | english source has changed 🔥`);
      this.updateEnglish(record, englishBefore, englishNow);
    }

    console.debug(`${base} | translated 👍🏼`);

    return record.native;
  }

  // NOTE: for some reason we're unable to create records using the Ember store
  // and thus we fall back on doing a POST with native fetch().

  async creatMissingTranslation(language, location, english) {
    const url = `${this.api.host}/${this.api.namespace}/translations`;
    const request = new Request(url, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers(this.api.headers),
      body: JSON.stringify({
        data: {
          attributes: {
            language,
            location,
            english,
            status: 'to-translate'
          }
        }
      })
    });

    fetch(request)
      .then((response) => response.json())
      .then((response) => {
        console.warn('create succeeded');
        console.warn(response);
      })
      .catch((response) => {
        console.error('create failed');
        console.error(response);
      });
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
      .then((response) => response.json())
      .then((response) => {
        console.warn('update succeeded');
        console.warn(response);
      })
      .catch((response) => {
        console.error('update failed');
        console.error(response);
      });
  }
}

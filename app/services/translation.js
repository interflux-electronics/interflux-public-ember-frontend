import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TranslationService extends Service {
  // The language in which the website is currently translated to.
  @tracked locale = 'en';

  // All available languages.
  @tracked languages = [
    {
      id: 'en',
      legacy: 'en',
      nameEnglish: 'English',
      nameNative: 'English',
      supported: true,
      ready: true,
      flag: 'GB'
    },
    {
      id: 'es',
      legacy: 'es',
      nameEnglish: 'Spanish',
      nameNative: 'Español',
      supported: true,
      ready: false,
      flag: 'ES'
    },
    {
      id: 'de',
      legacy: 'de',
      nameEnglish: 'German',
      nameNative: 'Deutsch',
      supported: true,
      ready: false,
      flag: 'DE'
    },
    {
      id: 'fr',
      legacy: 'fr',
      nameEnglish: 'French',
      nameNative: 'français',
      supported: true,
      ready: false,
      flag: 'FR'
    },
    {
      id: 'sv',
      legacy: 'sv',
      nameEnglish: 'Swedish',
      nameNative: 'Svenska',
      supported: false,
      ready: false,
      flag: 'SE'
    },
    {
      id: 'pl',
      legacy: 'pl',
      nameEnglish: 'Polish',
      nameNative: 'Polski',
      supported: true,
      ready: false,
      flag: 'PL'
    },
    {
      id: 'tr',
      legacy: 'tr',
      nameEnglish: 'Turkish',
      nameNative: 'Türkçe',
      supported: true,
      ready: false,
      flag: 'TR'
    },
    {
      id: 'th',
      legacy: 'th',
      nameEnglish: 'Thai',
      nameNative: 'ภาษาไทย',
      supported: true,
      ready: false,
      flag: 'TH'
    },
    {
      id: 'ru',
      legacy: 'ru',
      nameEnglish: 'Russian',
      nameNative: 'Русский',
      supported: true,
      ready: false,
      flag: 'RU'
    },
    {
      id: 'ro',
      legacy: 'ro',
      nameEnglish: 'Romanian',
      nameNative: 'Română',
      supported: true,
      ready: false,
      flag: 'RO'
    },
    {
      id: 'pt',
      legacy: 'pt-pt',
      nameEnglish: 'Portugese',
      nameNative: 'Português',
      supported: true,
      ready: false,
      flag: 'PT'
    },
    {
      id: 'id',
      legacy: 'id',
      nameEnglish: 'Indonesian',
      nameNative: 'Bahasa Indonesia',
      supported: true,
      ready: false,
      flag: 'ID'
    },
    {
      id: 'it',
      legacy: 'it',
      nameEnglish: 'Italian',
      nameNative: 'Italiano',
      supported: true,
      ready: false,
      flag: 'IT'
    },
    {
      id: 'cs',
      legacy: 'cs',
      nameEnglish: 'Chech',
      nameNative: 'Čeština',
      supported: true,
      ready: false,
      flag: 'CZ'
    },
    {
      id: 'zh',
      old: 'zh-hans',
      nameEnglish: 'Chinese',
      nameNative: '中文',
      supported: true,
      ready: false,
      flag: 'CN'
    },
    {
      id: 'ja',
      legacy: 'ja',
      nameEnglish: 'Japanese',
      nameNative: '日本語 (にほんご)',
      supported: false,
      ready: false,
      flag: 'JP'
    }
  ];

  @tracked data = {
    'index.continue': {
      en: 'Continue in **English**',
      zh: '继续用**中文**',
      de: 'Weiter auf **Deutsch**',
      es: 'Continuar en **español**',
      fr: 'Continuer en **français**',
      pl: 'Kontynuuj w języku **polskim**',
      sv: 'Fortsätt på **svenska**',
      ru: 'Продолжить на **русском**',
      id: 'Lanjutkan dalam **bahasa Indonesia**',
      th: 'ต่อเป็นภาษา**ไทย**',
      it: 'Continua in **italiano**',
      pt: 'Continua in **portoghese**',
      cz: 'Pokračujte v **češtině**',
      tr: '**Türkçe** devam et'
    }
  };
}

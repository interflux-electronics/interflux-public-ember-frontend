import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TranslationService extends Service {
  @tracked locale = 'zh';

  @tracked languages = [
    {
      id: 'en',
      nameEnglish: 'English',
      nameNative: 'English',
      supported: true,
      ready: true
    },
    {
      id: 'es',
      nameEnglish: 'Spanish',
      nameNative: 'Español',
      supported: true,
      ready: false
    },
    {
      id: 'de',
      nameEnglish: 'German',
      nameNative: 'Deutsch',
      supported: true,
      ready: false
    },
    {
      id: 'fr',
      nameEnglish: 'French',
      nameNative: 'français',
      supported: true,
      ready: false
    },
    {
      id: 'sv',
      nameEnglish: 'Swedish',
      nameNative: 'Svenska',
      supported: true,
      ready: false
    },
    {
      id: 'pl',
      nameEnglish: 'Polish',
      nameNative: 'Polski',
      supported: true,
      ready: false
    },
    {
      id: 'tr',
      nameEnglish: 'Turkish',
      nameNative: 'Türkçe',
      supported: true,
      ready: false
    },
    {
      id: 'th',
      nameEnglish: 'Thai',
      nameNative: 'ภาษาไทย',
      supported: true,
      ready: false
    },
    {
      id: 'ru',
      nameEnglish: 'Russian',
      nameNative: 'Русский',
      supported: true,
      ready: false
    },
    {
      id: 'ro',
      nameEnglish: 'Romanian',
      nameNative: 'Română',
      supported: true,
      ready: false
    },
    {
      id: 'pt',
      nameEnglish: 'Portugese',
      nameNative: 'Português',
      supported: true,
      ready: false
    },
    {
      id: 'id',
      nameEnglish: 'Indonesian',
      nameNative: 'Bahasa Indonesia',
      supported: true,
      ready: false
    },
    {
      id: 'it',
      nameEnglish: 'Italian',
      nameNative: 'Italiano',
      supported: true,
      ready: false
    },
    {
      id: 'cs',
      nameEnglish: 'Chech',
      nameNative: 'Čeština',
      supported: true,
      ready: false
    },
    {
      id: 'zh',
      nameEnglish: 'Chinese',
      nameNative: '中文',
      supported: true,
      ready: false
    },
    {
      id: 'ja',
      nameEnglish: 'Japanese',
      nameNative: '日本語 (にほんご)',
      supported: false,
      ready: false
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

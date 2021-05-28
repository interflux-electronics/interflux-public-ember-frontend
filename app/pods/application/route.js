import BaseRoute from 'interflux/pods/base/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends BaseRoute {
  @service store;

  model() {
    this.store.pushPayload({
      data: [
        {
          id: 'en',
          type: 'language',
          attributes: {
            'name-english': 'English',
            'name-native': 'English',
            'two-letter-code': 'en',
            supported: true,
            ready: true
          }
        },
        {
          id: 'es',
          type: 'language',
          attributes: {
            'name-english': 'Spanish',
            'name-native': 'Español',
            'two-letter-code': 'es',
            supported: true,
            ready: false
          }
        },
        {
          id: 'de',
          type: 'language',
          attributes: {
            'name-english': 'German',
            'name-native': 'Deutsch',
            'two-letter-code': 'de',
            supported: true,
            ready: false
          }
        },
        {
          id: 'fr',
          type: 'language',
          attributes: {
            'name-english': 'French',
            'name-native': 'français',
            'two-letter-code': 'fr',
            supported: true,
            ready: false
          }
        },
        {
          id: 'sv',
          type: 'language',
          attributes: {
            'name-english': 'Swedish',
            'name-native': 'Svenska',
            'two-letter-code': 'sv',
            supported: true,
            ready: false
          }
        },
        {
          id: 'pl',
          type: 'language',
          attributes: {
            'name-english': 'Polish',
            'name-native': 'Polski',
            'two-letter-code': 'pl',
            supported: true,
            ready: false
          }
        },
        {
          id: 'tr',
          type: 'language',
          attributes: {
            'name-english': 'Turkish',
            'name-native': 'Türkçe',
            'two-letter-code': 'tr',
            supported: true,
            ready: false
          }
        },
        {
          id: 'th',
          type: 'language',
          attributes: {
            'name-english': 'Thai',
            'name-native': 'ภาษาไทย',
            'two-letter-code': 'th',
            supported: true,
            ready: false
          }
        },
        {
          id: 'ru',
          type: 'language',
          attributes: {
            'name-english': 'Russian',
            'name-native': 'Русский',
            'two-letter-code': 'ru',
            supported: true,
            ready: false
          }
        },
        {
          id: 'ro',
          type: 'language',
          attributes: {
            'name-english': 'Romanian',
            'name-native': 'Română',
            'two-letter-code': 'ro',
            supported: true,
            ready: false
          }
        },
        {
          id: 'pt',
          type: 'language',
          attributes: {
            'name-english': 'Portugese',
            'name-native': 'Português',
            'two-letter-code': 'pt',
            supported: true,
            ready: false
          }
        },
        {
          id: 'id',
          type: 'language',
          attributes: {
            'name-english': 'Indonesian',
            'name-native': 'Bahasa Indonesia',
            'two-letter-code': 'id',
            supported: true,
            ready: false
          }
        },
        {
          id: 'it',
          type: 'language',
          attributes: {
            'name-english': 'Italian',
            'name-native': 'Italiano',
            'two-letter-code': 'it',
            supported: true,
            ready: false
          }
        },
        {
          id: 'cs',
          type: 'language',
          attributes: {
            'name-english': 'Chech',
            'name-native': 'Čeština',
            'two-letter-code': 'cs',
            supported: true,
            ready: false
          }
        },
        {
          id: 'zh',
          type: 'language',
          attributes: {
            'name-english': 'Chinese',
            'name-native': '中文',
            'two-letter-code': 'zh',
            supported: true,
            ready: false
          }
        },
        {
          id: 'ja',
          type: 'language',
          attributes: {
            'name-english': 'Japanese',
            'name-native': '日本語 (にほんご)',
            'two-letter-code': 'ja',
            supported: false,
            ready: false
          }
        }
      ]
    });

    this.store.pushPayload({
      data: [
        {
          id: 'soldering-fluxes',
          type: 'product-family',
          attributes: {
            slug: 'soldering-fluxes',
            'name-single': 'soldering flux',
            'name-plural': 'soldering fluxes',
            order: 1
          }
        },
        {
          id: 'solder-pastes',
          type: 'product-family',
          attributes: {
            slug: 'solder-pastes',
            'name-single': 'solder paste',
            'name-plural': 'solder pastes',
            order: 2
          }
        },
        {
          id: 'solder-wires',
          type: 'product-family',
          attributes: {
            slug: 'solder-wires',
            'name-single': 'solder wire',
            'name-plural': 'solder wires',
            order: 3
          }
        },
        {
          id: 'solder-alloys',
          type: 'product-family',
          attributes: {
            slug: 'solder-alloys',
            'name-single': 'solder alloy',
            'name-plural': 'solder alloys',
            order: 4
          }
        },
        {
          id: 'fluxing-systems',
          type: 'product-family',
          attributes: {
            slug: 'fluxing-systems',
            'name-single': 'fluxing system',
            'name-plural': 'fluxing systems',
            order: 5
          }
        },
        {
          id: 'auxiliaries',
          type: 'product-family',
          attributes: {
            slug: 'auxiliaries',
            'name-single': 'auxiliary',
            'name-plural': 'auxiliaries',
            order: 6
          }
        }
      ]
    });
  }
}

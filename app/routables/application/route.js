import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service store;

  model() {
    this.store.pushPayload({
      data: [
        {
          id: '7771cac5-fed3-4b35-a94c-6d6f69e022a6',
          type: 'language',
          attributes: {
            'name-english': 'English',
            'name-native': 'English',
            'two-letter-code': 'en'
          }
        },
        {
          id: 'abd5b5a4-c143-468f-91e9-60a5bafcb002',
          type: 'language',
          attributes: {
            'name-english': 'Spanish',
            'name-native': 'Español',
            'two-letter-code': 'es'
          }
        },
        {
          id: '7f001318-548b-43e1-99a1-c2a8bd67b5c0',
          type: 'language',
          attributes: {
            'name-english': 'German',
            'name-native': 'Deutsch',
            'two-letter-code': 'de'
          }
        },
        {
          id: '4c5093e5-03c2-4d51-a569-8e52f023c2f2',
          type: 'language',
          attributes: {
            'name-english': 'French',
            'name-native': 'français',
            'two-letter-code': 'fr'
          }
        },
        {
          id: 'b5a315c4-48f4-4028-b95c-54c8d0003c5e',
          type: 'language',
          attributes: {
            'name-english': 'Japanese',
            'name-native': '日本語 (にほんご)',
            'two-letter-code': 'ja'
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

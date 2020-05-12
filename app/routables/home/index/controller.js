import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HomeIndexController extends Controller {
  @tracked imageLeft = 'image-1';
  @tracked imageRight = 'image-6';

  @action
  showImage(i) {
    if (i <= 5) {
      this.imageLeft = `image-${i}`;
    } else {
      this.imageRight = `image-${i}`;
    }
  }

  get languages() {
    return [
      {
        locale: 'en',
        nameNative: 'English',
        supported: true
      },
      {
        locale: 'zh',
        nameNative: '中文'
      },
      {
        locale: 'cs',
        nameNative: 'Čeština'
      },
      {
        locale: 'de',
        nameNative: 'Deutsch'
      },
      {
        locale: 'fr',
        nameNative: 'Français'
      },
      {
        locale: 'it',
        nameNative: 'Italiano'
      },
      {
        locale: 'id',
        nameNative: 'Bahasa Indonesia'
      },
      {
        locale: 'pt',
        nameNative: 'Português'
      },
      {
        locale: 'ro',
        nameNative: 'Română'
      },
      {
        locale: 'ru',
        nameNative: 'Русский'
      },
      {
        locale: 'th',
        nameNative: 'ภาษาไทย'
      },
      {
        locale: 'tr',
        nameNative: 'Türkçe'
      },
      {
        locale: 'pl',
        nameNative: 'Polski'
      },
      {
        locale: 'es',
        nameNative: 'Español'
      },
      {
        locale: 'sv',
        nameNative: 'Svenska'
      }
    ];
  }
}

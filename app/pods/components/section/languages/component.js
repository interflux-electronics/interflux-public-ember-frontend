import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class SectionLanguagesComponent extends Component {
  @service translation;

  get languages() {
    return [];
    // TODO: return this.translation.languages.filter((l) => l.supported);
  }

  @action
  onLanguageClick(locale) {
    // Remember the user's preferred language for next visit.
    localStorage.setItem('preferred-language', locale);
  }
}

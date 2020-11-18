import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class SectionLanguagesComponent extends Component {
  @service store;

  get languages() {
    return this.store
      .peekAll('language')
      .filterBy('supported', true)
      .sortBy('nameNative');
  }
}

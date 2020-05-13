import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class FooterComponent extends Component {
  @service store;

  get languages() {
    return this.store
      .peekAll('language')
      .filterBy('supported', true)
      .sortBy('nameNative');
  }

  get year() {
    return new Date().getFullYear();
  }
}

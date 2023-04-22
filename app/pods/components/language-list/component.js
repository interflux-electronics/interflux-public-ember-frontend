import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class LanguageListComponent extends Component {
  @service router;

  get path() {
    return this.router.currentURL;
  }
}

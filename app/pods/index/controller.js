import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @service translation;
  @service fastboot;

  @action
  onLanguageClick(locale) {
    // Remember the user's preferred language for next visit.
    localStorage.setItem('preferred-language', locale);
  }
}

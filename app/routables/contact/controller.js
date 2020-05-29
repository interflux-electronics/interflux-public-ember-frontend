import Controller from '@ember/controller';

export default class ContactController extends Controller {
  get companies() {
    const group = this.model.companies
      .filterBy('isGroup', true)
      .sortBy('country.nameEnglish');
    const partners = this.model.companies
      .filterBy('isGroup', false)
      .sortBy('country.nameEnglish');

    return [...group, ...partners];
  }
}

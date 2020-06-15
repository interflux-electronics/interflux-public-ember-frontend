import Controller from '@ember/controller';

export default class ContactController extends Controller {
  get companies() {
    return this.model.companies.sortBy('rank', 'businessName');
  }
}

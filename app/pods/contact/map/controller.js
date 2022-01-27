import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ContactController extends Controller {
  @tracked intention;
  @tracked neededDocument;
  @tracked sdsProduct;

  get recommendedCompanies() {
    return [
      {
        name: 'ABAN Electronics',
        country: 'India',
        isRecommended: true
      },
      {
        name: 'Interflux Singapore',
        country: 'Singapore',
        isRecommended: false
      }
    ];
  }

  // get companies() {
  //   return this.model.companies.sortBy('rank', 'businessName');
  // }
}

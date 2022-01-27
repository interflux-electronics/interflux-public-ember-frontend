import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ContactPageFindSectionComponent extends Component {
  @tracked intention;
  @tracked shipToCountry;
  @tracked neededDocument;
  @tracked sdsProduct;
  @tracked browser;
  @tracked device;
  @tracked canContact;

  @action
  sendBugReport() {
    console.debug('send bug report');
  }

  // TODO: Base suggestions on IP, user profile, browser language and previously chosen countries
  get suggestedCountries() {
    return this.args.countries.filter((country) => {
      return ['Belgium', 'Australia', 'China'].includes(country.nameEnglish);
    });
  }
}

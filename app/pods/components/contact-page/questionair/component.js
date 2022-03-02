import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ContactPageQuestionairComponent extends Component {
  @tracked intention;
  @tracked neededDocument;
  @tracked sdsProduct;
  @tracked browser;
  @tracked device;
  @tracked canContact;

  @action
  sendBugReport() {
    console.debug('send bug report');
  }

  @tracked country;
  @tracked selectedCountries = [];

  @action
  onCountrySelect(country) {
    this.country = country;
    this.selectedCountries = [...this.selectedCountries, country];
  }

  get uniqueSelectedCountries() {
    const ids = this.selectedCountries.mapBy('id').uniq();

    return ids.map((id) => {
      return this.selectedCountries.findBy('id', id);
    });
  }

  get suggestedCountries() {
    // TODO include the country of the IP address
    // TODO include the country of the users profile
    // TODO make assumption based on browser language
    return this.uniqueSelectedCountries;
  }
}

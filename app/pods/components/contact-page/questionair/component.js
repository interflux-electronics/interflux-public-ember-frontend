import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ContactPageQuestionairComponent extends Component {
  @service user;

  @tracked intention;
  @tracked neededDocument;
  @tracked sdsProduct;
  @tracked browser;
  @tracked device;
  @tracked canContact;
  @tracked foundDoc;
  @tracked document;

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

  @action
  onDocumentSelect(document) {
    this.document = document;
  }

  get uniqueSelectedCountries() {
    const ids = this.selectedCountries.mapBy('id').uniq();

    if (this.user.ipCountryId) {
      ids.push(this.user.ipCountryId);
    }

    return ids.map((id) => {
      return this.args.countries.findBy('id', id);
    });
  }

  // TODO include the country of the users profile
  // TODO make assumption based on browser language
  get suggestedCountries() {
    return this.uniqueSelectedCountries;
  }
}

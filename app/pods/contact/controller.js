import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ContactController extends Controller {
  // @args isLoading;
  // @args companies;

  @tracked query;
  @tracked matches;

  get sortedCompanies() {
    return this.model.companies.sortBy('rank', 'businessName');
  }

  get total() {
    return this.companies.length;
  }

  @action
  updateCounter(matches) {
    this.matches = matches;
  }

  @action
  onKeyUp(event) {
    const input = event.target;
    const query = input.value;

    // Update local value so <input> field receives same @value.
    this.query = query;

    // Next find the <FilterList> and fire the filter event on its content.
    const el = document.querySelector('.filterable-list');
    const ev = new CustomEvent('filter', { detail: { query } });
    if (el) {
      el.dispatchEvent(ev);
    }
  }
}

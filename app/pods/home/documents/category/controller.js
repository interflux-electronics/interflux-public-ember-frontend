import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HomeDocumentsCategoryController extends Controller {
  @tracked query;

  @action
  onSearch(query) {
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

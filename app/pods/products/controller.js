import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ProductsController extends Controller {
  @service page;
  @service router;
  @service translation;

  // SEARCH BY NAME

  queryParams = ['search'];

  @tracked search = '';

  @action
  onKeyUp(event) {
    const input = event.target;
    this.search = input.value;
  }

  get searchTitle() {
    const resultsFor = this.translation.t('Results for', 'products.14');

    return `${resultsFor} "${this.search}"`;
  }

  // FAMILY

  @tracked mainFamilies;
  @tracked selectedFamilyId; // set by child routes
  @tracked familiesSubset; // set by child routes
  @tracked familiesLoading;

  get familyOptions() {
    const families =
      this.selectedUseId && this.familiesSubset
        ? this.familiesSubset
        : this.mainFamilies;

    return families.sortBy('rank').map((family) => {
      const id = family.get('id');
      const label = this.translation.t(family.get('label'), `products.4`, id);
      const isSelected = id === this.selectedFamilyId;

      let route;
      let model;
      let models;

      if (this.selectedFamilyId && this.selectedUseId) {
        // On the mix route, clicking the selected family button takes you to the use route.
        route = 'products.use';
        model = this.selectedUseId;
      } else if (this.selectedFamilyId) {
        // On the family route, clicking the selected family button takes you the index route.
        route = 'products.index';
      } else if (this.selectedUseId) {
        // On the use route, clicking a family button takes you the mix route.
        route = 'products.mix';
        models = [family.get('id'), this.selectedUseId];
      } else {
        // On the index route, clicking a family button takes you to the family route.
        route = 'products.family';
        model = family.get('id');
      }

      return { label, route, model, models, isSelected };
    });
  }

  get selectedFamilyOption() {
    return this.familyOptions.find((option) => option.isSelected);
  }

  // USE

  @tracked uses;
  @tracked selectedUseId;
  @tracked usesSubset;
  @tracked usesLoading;

  get useOptions() {
    const uses =
      this.selectedFamilyId && this.usesSubset ? this.usesSubset : this.uses;

    return uses.sortBy('rank').map((use) => {
      const id = use.get('id');
      const label = this.translation.t(
        use.get('label'),
        'products.5',
        `for-${id}`
      );
      const selected = id === this.selectedUseId;

      let route;
      let model;
      let models;

      if (this.selectedFamilyId && this.selectedUseId) {
        // On the mix route, clicking the selected use button takes you to the family route.
        route = 'products.family';
        model = this.selectedFamilyId;
      } else if (this.selectedFamilyId) {
        // On the family route, clicking a use button takes you to the mix route.
        route = 'products.mix';
        models = [this.selectedFamilyId, use.get('id')];
      } else if (this.selectedUseId) {
        // On the use route, clicking the selected use button takes you to the index route.
        route = 'products.index';
      } else {
        // On the index route, clicking a use button takes you to the use route.
        route = 'products.use';
        model = use.get('id');
      }

      return { label, route, model, models, selected };
    });
  }

  get selectedUseOption() {
    return this.useOptions.find((option) => option.selected);
  }

  // VIEW

  // TODO: build
  // @tracked layout = 'list'; // list, grid

  // TODO: review
  get stickyMenu() {
    return this.router.currentRouteName !== 'products.index' || this.search;
  }
}

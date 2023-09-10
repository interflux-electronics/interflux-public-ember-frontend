import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ProductsController extends Controller {
  @service page;
  @service router;

  // VIEW

  // TODO: build
  // @tracked layout = 'list'; // list, grid

  // TODO: review
  get stickyMenu() {
    return this.router.currentRouteName !== 'products.index';
  }

  // FAMILY

  @tracked selectedFamilyId; // set by child routes
  @tracked mainFamiliesSubset; // set by child routes

  get allMainFamilies() {
    return this.model.families.filterBy('isMainFamily');
  }

  get familyOptions() {
    const families =
      this.selectedUseId && this.mainFamiliesSubset
        ? this.mainFamiliesSubset
        : this.allMainFamilies;

    return families.sortBy('rank').map((family) => {
      const label = family.get('label');
      const selected = family.get('id') === this.selectedFamilyId;

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

      return { label, route, model, models, selected };
    });
  }

  get selectedFamilyOption() {
    return this.familyOptions.find((option) => option.selected);
  }

  // USE

  @tracked selectedUseId; // set by child routes
  @tracked usesSubset; // set by child routes

  get allUses() {
    return this.model.uses;
  }

  get useOptions() {
    const uses =
      this.selectedFamilyId && this.usesSubset ? this.usesSubset : this.allUses;

    return uses.sortBy('rank').map((use) => {
      const label = use.get('label');
      const selected = use.get('id') === this.selectedUseId;

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
}

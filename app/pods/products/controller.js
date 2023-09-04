import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ProductsController extends Controller {
  @service page;
  @service router;

  // @tracked process = null;
  // @tracked search = null;
  @tracked layout = 'list'; // list, grid

  // get findByUse() {
  //   return this.router.currentRouteName.startsWith('products.use');
  // }

  // FAMILY

  @tracked selectedFamily;

  get families() {
    if (!this.model) {
      return [];
    }
    return this.model.families;
  }

  get familyOptions() {
    return this.families
      .filterBy('isMainFamily')
      .sortBy('rank')
      .map((mainFamily) => {
        const label = mainFamily.label;
        const route = 'products.family';
        const model = mainFamily.id;

        return { label, route, model };
      });
  }

  // USE

  @tracked selectedUse;

  get uses() {
    return this.model.uses;
  }

  get useOptions() {
    return this.uses.sortBy('label').map((use) => {
      const label = use.label;
      const route = 'products.use';
      const model = use.id;

      return { label, route, model };
    });
  }

  // STICKY

  get stickyMenu() {
    return this.router.currentRouteName !== 'products.index';
  }
}

import Controller from '@ember/controller';

export default class ProductsIndexController extends Controller {
  get sortedFamilies() {
    const families = this.model.families;
    const ranked = families.filter(x => x.rank).sortBy('rank');
    const noRank = families.reject(x => x.rank).sortBy('label');
    return [...ranked, ...noRank];
  }

  get sortedUses() {
    const uses = this.model.uses;
    const ranked = uses.filter(x => x.rank).sortBy('rank');
    const noRank = uses.reject(x => x.rank).sortBy('text');
    return [...ranked, ...noRank];
  }
}

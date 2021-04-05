import Controller from '@ember/controller';

export default class ProductsIndexController extends Controller {
  get sortedFamilies() {
    const mainFamilies = this.model.families.filterBy('isMainFamily');
    const ranked = mainFamilies.filter(x => x.rank).sortBy('rank');
    const noRank = mainFamilies.reject(x => x.rank).sortBy('label');
    return [...ranked, ...noRank];
  }

  get sortedUses() {
    const uses = this.model.uses;
    const ranked = uses.filter(x => x.rank).sortBy('rank');
    const noRank = uses.reject(x => x.rank).sortBy('text');
    return [...ranked, ...noRank];
  }
}

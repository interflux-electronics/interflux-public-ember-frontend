import Controller from '@ember/controller';

export default class ProductsUseSelectedController extends Controller {
  get groups() {
    const productsForUse = this.model.use.productsByRank.rejectBy('isOffline');
    const mainFamilies = productsForUse.mapBy('mainFamily');
    const uniqueIDs = Array.from(new Set(mainFamilies.mapBy('id')));

    return uniqueIDs.map((id) => {
      const family = mainFamilies.find((f) => f.get('id') === id);
      const products = productsForUse.filterBy(
        'mainFamily.id',
        family.get('id')
      );

      return {
        title: `${family.get('namePlural')} for ${this.model.use.text}`,
        featuredProducts: products.filterBy('isFeatured'),
        hiddenProducts: products.filterBy('isHidden')
      };
    });
  }
}

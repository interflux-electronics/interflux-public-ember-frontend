import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ProductGroupPageComponent extends Component {
  // @args use
  // @args uses

  @tracked layout = 'list';

  get query() {
    return this.args.query;
  }

  get family() {
    return this.args.family;
  }

  get use() {
    return this.args.use;
  }

  get products() {
    if (this.query) {
      return this.args.products;
    }

    if (this.family) {
      return this.family.products;
    }

    if (this.use) {
      return this.use.products;
    }

    return [];
  }

  get pageTitle() {
    if (this.query) {
      return `Results for "${this.query}"`;
    }

    if (this.family) {
      return this.family.label;
    }

    if (this.use) {
      return `Products for ${this.use.text}`;
    }

    return '?';
  }

  get groups() {
    // if (this.args.query) {
    //   return [
    //     {
    //       products: this.products
    //     }
    //   ];
    // }

    if (this.family) {
      const productsForFamily =
        this.family.productsByRank.rejectBy('isOffline');
      const uses = productsForFamily.mapBy('uses').flat();
      const uniqueIDs = Array.from(new Set(uses.mapBy('id')));

      return uniqueIDs.map((id) => {
        const use = uses.find((u) => u.get('id') === id);
        const products = productsForFamily.filter((p) => {
          return p.uses.findBy('id', use.get('id'));
        });

        if (products.length < 1) {
          console.warn(`no products for ${use.get('name')}`);
        }

        return {
          title: `for ${use.get('name')}`,
          featuredProducts: products.filterBy('isFeatured'),
          hiddenProducts: products.filterBy('isHidden')
        };
      });
    }

    if (this.use) {
      const productsForUse = this.use.productsByRank.rejectBy('isOffline');
      const mainFamilies = productsForUse.mapBy('mainFamily');
      const uniqueIDs = Array.from(new Set(mainFamilies.mapBy('id')));

      return uniqueIDs.map((id) => {
        const family = mainFamilies.find((f) => f.get('id') === id);
        const products = productsForUse.filterBy(
          'mainFamily.id',
          family.get('id')
        );

        return {
          title: `${family.get('namePlural')} for ${this.use.text}`,
          featuredProducts: products.filterBy('isFeatured'),
          hiddenProducts: products.filterBy('isHidden')
        };
      });
    }

    return [];
  }

  @tracked selectedUse;
  @tracked selectedGroup;

  get groupOptions() {
    return [
      { label: 'Name', value: 'name' },
      { label: 'Type', value: 'type' },
      { label: 'Process', value: 'process' }
    ];
  }

  get useOptions() {
    return this.args.uses.sortBy('improvedRank').map((use) => {
      const label = use.label;
      const value = use.id;

      return { label, value };
    });
  }

  get uses() {
    return this.args.uses.sortBy('improvedRank');
  }
}

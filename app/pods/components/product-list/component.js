import Component from '@glimmer/component';

export default class ProductListComponent extends Component {
  // @arg title;
  // @arg products;
  // @arg sortBy;
  // @arg searchFor;
  // @arg loading;

  get groups() {
    const { groupBy, products, use } = this.args;

    // For index (all products)
    if (groupBy === 'mainFamily') {
      const mainFamilies = products
        .mapBy('mainFamily')
        .uniqBy('id')
        .sortBy('rank');

      return mainFamilies.map((family) => {
        const subset = products
          .filterBy('mainFamily.id', family.get('id'))
          .sortBy('subFamily.rank');

        return {
          title: family.get('label'),
          featured: subset.filterBy('isFeatured'),
          hidden: subset.filterBy('isHidden')
        };
      });
    }

    // For soldering fluxes
    // For auxiliaries
    if (groupBy === 'subFamily') {
      const subFamilies = products
        .filterBy('subFamily.id')
        .mapBy('subFamily')
        .uniqBy('id')
        .sortBy('rank');

      // This approach catches all products with no subFamilies and sorts them
      // to the bottom in category called "Others" until sub family is assigned.
      const groups = [...subFamilies, undefined];

      return groups.map((family) => {
        const subset = family
          ? products.filterBy('subFamily.id', family.get('id'))
          : products.rejectBy('subFamily.id');

        return {
          title: family ? family.get('label') : 'Other',
          featured: subset.filterBy('isFeatured'),
          hidden: subset.filterBy('isHidden')
        };
      });
    }

    // For solder pastes
    // For solder wires
    // For solder alloys
    if (groupBy === 'alloy') {
      const uses = products.mapBy('uses').flat().uniqBy('id').sortBy('rank');

      return uses.map((use) => {
        const subset = use.get('productsByRank');

        return {
          title: use.get('forLabel'),
          featured: subset.filterBy('isFeatured'),
          hidden: subset.filterBy('isHidden')
        };
      });
    }

    // For processes (uses)
    if (groupBy === 'mainFamilyForUse') {
      const mainFamilies = products.mapBy('mainFamily').uniqBy('id');

      return mainFamilies.map((family) => {
        const subset = products.filterBy('mainFamily.id', family.get('id'));

        return {
          title: `${family.get('label')} for ${use.get('name')}`,
          featured: subset.filterBy('isFeatured'),
          hidden: subset.filterBy('isHidden')
        };
      });
    }

    // For fluxing systems and search
    if (groupBy === 'none') {
      return [
        {
          title: null,
          featured: products.filterBy('isFeatured'),
          hidden: products.filterBy('isHidden')
        }
      ];
    }

    // For spotting issues
    return [
      {
        title: '?',
        products: []
      }
    ];
  }
}

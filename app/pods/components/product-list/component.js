import Component from '@glimmer/component';

export default class ProductListComponent extends Component {
  // @arg title;
  // @arg products;
  // @arg sortBy;
  // @arg searchFor;
  // @arg loading;

  get groups() {
    const { groupBy, products } = this.args;

    // All products
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

    // Soldering fluxes
    // Auxiliaries
    if (groupBy === 'subFamily') {
      const subFamilies = products.mapBy('subFamily').uniqBy('id');

      return subFamilies.map((family) => {
        const subset = products.filterBy('subFamily.id', family.get('id'));

        return {
          title: family.get('label'),
          featured: subset.filterBy('isFeatured'),
          hidden: subset.filterBy('isHidden')
        };
      });
    }

    // Solder pastes
    // Solder wires
    // Solder alloys
    if (groupBy === 'alloy') {
      const uses = products.mapBy('uses').flat().uniqBy('id').sortBy('rank');

      return uses.map((use) => {
        const subset = use.get('productsByRank');

        return {
          title: `For ${use.get('label')}`,
          featured: subset.filterBy('isFeatured'),
          hidden: subset.filterBy('isHidden')
        };
      });
    }

    // For
    if (groupBy === 'none') {
      return [
        {
          title: null,
          featured: products.filterBy('isFeatured'),
          hidden: products.filterBy('isHidden')
        }
      ];
    }

    // if (groupBy === 'status') {
    //   const statuses = [
    //     'new',
    //     'popular',
    //     'recommended',
    //     'outdated',
    //     'discontinued'
    //   ];

    //   return statuses.map((status) => {
    //     const subset = products
    //       .filterBy('status', status)
    //       .sortBy('mainFamily', 'rank');

    //     return {
    //       title: status,
    //       featured: subset
    //     };
    //   });
    // }

    return [
      {
        title: '?',
        products: []
      }
    ];
  }
}

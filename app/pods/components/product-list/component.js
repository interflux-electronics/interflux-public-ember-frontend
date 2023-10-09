import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ProductListComponent extends Component {
  // @arg title;
  // @arg products;
  // @arg sortBy;
  // @arg searchFor;
  // @arg loading;

  @service translation;

  get groups() {
    const { groupBy, products, use } = this.args;

    // For index (all products)
    if (groupBy === 'mainFamily') {
      const mainFamilies = products
        .mapBy('mainFamily')
        .uniqBy('id')
        .sortBy('rank');

      return mainFamilies.map((family) => {
        const id = family.get('id');
        const title = this.translation.t(family.get('label'), `products.4`, id);
        const subset = products
          .filterBy('mainFamily.id', id)
          .sortBy('subFamily.rank');

        return {
          title,
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
        const id = family ? family.get('id') : null;
        const subset = family
          ? products.filterBy('subFamily.id', id)
          : products.rejectBy('subFamily.id');

        const title = family
          ? this.translation.t(family.get('label'), `products.14`, id)
          : this.translation.t('Other', `products.14`, 'other');

        return {
          title,
          featured: subset.filterBy('isFeatured'),
          hidden: subset.filterBy('isHidden')
        };
      });
    }

    // For solder pastes
    // For solder wires
    // For solder alloys
    if (groupBy === 'use') {
      const uses = products.mapBy('uses').flat().uniqBy('id').sortBy('rank');

      return uses.map((use) => {
        const rank = 'rankAmongProducts';
        const productUses = use.get('productUses').filter((p) => {
          return products.findBy('id', p.get('product.id'));
        });
        const ranked = productUses.filterBy(rank).sortBy(rank);
        const rankless = productUses.rejectBy(rank);
        const sorted = [...ranked, ...rankless];
        const subset = sorted.map((record) => record.get('product'));

        const title = this.translation.t(
          use.get('forLabel'),
          'products.16',
          use.get('id')
        );

        return {
          title,
          featured: subset.filterBy('isFeatured'),
          hidden: subset.filterBy('isHidden'),
          productUses
        };
      });
    }

    // For processes (uses)
    if (groupBy === 'mainFamilyForUse') {
      const mainFamilies = products.mapBy('mainFamily').uniqBy('id');

      return mainFamilies.map((family) => {
        const subset = products.filterBy('mainFamily.id', family.get('id'));
        const title = this.translation.t(
          `${family.get('label')} for ${use.get('name')}`,
          'products.17',
          `${family.get('id')}-for-${use.get('id')}`
        );

        return {
          title,
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

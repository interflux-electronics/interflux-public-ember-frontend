import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ProductsSubsetController extends Controller {
  @service store;
  @service router;

  get isFamily() {
    return this.model.family ? true : false;
  }

  get isUse() {
    return this.model.use ? true : false;
  }

  get pageTitle() {
    if (this.isFamily) {
      return this.model.family.get('label');
    }
    if (this.isUse) {
      return `For ${this.model.use.get('text')}`;
    }
    return '?';
  }

  get searchPlaceHolder() {
    return (
      this.products
        .sortBy('rank')
        .firstObject.get('name')
        .slice(0, -1) + '...'
    );
  }

  @tracked groupBy = 'status'; // 'status', 'family', 'use', 'quality'

  @action
  onInsert() {
    if (this.isFamily) {
      this.groupBy = 'status';
    }
    if (this.isUse) {
      this.groupBy = 'status';
    }
  }

  get groupByStatus() {
    return this.groupBy === 'status';
  }

  get groupByFamily() {
    return this.groupBy === 'family';
  }

  get groupByUse() {
    return this.groupBy === 'use';
  }

  get groupByQuality() {
    return this.groupBy === 'quality';
  }

  get products() {
    if (this.isFamily) {
      return this.model.family.get('products');
    }
    if (this.isUse) {
      return this.model.use.get('products');
    }
    return [];
  }

  get familySubsets() {
    const uniq = this.products
      .mapBy('family')
      .sortBy('rank')
      .mapBy('id')
      .uniq();

    return uniq.map(id => {
      const family = this.store.peekRecord('product-family', id);
      const products = this.products.filterBy('family.id', id);

      return { family, products };
    });
  }

  get useSubsets() {
    return this.uses.map(use => {
      const products = this.products.filter(product => {
        return product
          .get('uses')
          .mapBy('id')
          .includes(use.id);
      });

      return { use, products };
    });
  }

  get qualitySubsets() {
    return this.qualities.map(quality => {
      const products = this.products.filter(product => {
        return product
          .get('qualities')
          .mapBy('id')
          .includes(quality.id);
      });

      return { quality, products };
    });
  }

  get statusSubsets() {
    const arr = [];

    const statuses = [
      {
        id: 'new',
        label: 'New',
        description: 'The newest in soldering chemistry.'
      },
      {
        id: 'popular',
        label: 'Popular',
        description: 'In high demand for years.'
      },
      {
        id: 'common',
        label: 'Recommended',
        description: 'Niche products for specific use cases.'
      },
      {
        id: 'outdated',
        label: 'Outdated',
        description:
          'At Interflux we continuously improve the chemistry and production techniques of our products. As we innovate, some products will become outdated. This means a better product is available. Outdated products are still in production and can still be ordered. However, consider upgrading soon!'
      },
      {
        id: 'discontinued',
        label: 'Discontinued',
        description:
          'When products are outdated and nobody is ordering them anymore, we take them out of production (discontinued). For reference, we keep them available on our website.'
      }
    ];

    statuses.forEach(status => {
      const products = this.products
        .filterBy('status', status.id)
        .sortBy('rank');

      console.log(status, products.length);

      if (products.length) {
        arr.push({ ...status, products });
      }
    });

    return arr;
  }

  get statuses() {
    return [
      {
        id: 'new',
        label: 'New'
      },
      {
        id: 'popular',
        label: 'Popular'
      },
      {
        id: 'recommended',
        label: 'Recommended'
      },
      {
        id: 'outdated',
        label: 'Outdated'
      },
      {
        id: 'discontinued',
        label: 'Discontinued'
      }
    ];
  }

  get families() {
    const uniq = this.products.mapBy('family.id').uniq();

    return uniq
      .map(id => this.store.peekRecord('product-family', id))
      .sortBy('rank');
  }

  get uses() {
    const uniq = this.products
      .mapBy('uses')
      .map(arr => {
        return arr.mapBy('id');
      })
      .flat()
      .uniq();

    return uniq.map(id => this.store.peekRecord('use', id)).sortBy('rank');
  }

  get qualities() {
    const uniq = this.products
      .mapBy('qualities')
      .map(arr => {
        return arr.mapBy('id');
      })
      .flat()
      .uniq();

    return uniq.map(id => this.store.peekRecord('quality', id)).sortBy('rank');
  }

  @action
  openProductPage(product) {
    this.router.transitionTo('home.product', product.id);
  }

  // @tracked whitelist = [
  //   'soldering-fluxes',
  //   'solder-pastes',
  //   'solder-wires',
  //   'solder-alloys',
  //   'auxiliaries'
  // ];

  // get filters() {
  //   const families = [];
  //   const uses = [];
  //
  //   // const families = this.model.families.sortBy('rank').map(family => {
  //   //   return {
  //   //     id: family.id,
  //   //     label: capitalize(family.namePlural),
  //   //     checked: this.whitelist.includes(family.id)
  //   //   };
  //   // });
  //   //
  //   // const uses = this.model.uses.map(use => {
  //   //   return {
  //   //     id: use.id,
  //   //     label: capitalize(use.text),
  //   //     checked: this.whitelist.includes(use.id)
  //   //   };
  //   // });
  //
  //   return { families, uses };
  // }

  @action
  toggle(id) {
    console.log('toggle', id);
    let arr = [...this.whitelist];
    if (arr.includes(id)) {
      arr = arr.reject(x => x === id);
    } else {
      arr.push(id);
    }
    this.whitelist = arr;
  }

  template;

  @action
  didInsertProducts(element) {
    this.template = element;
  }

  @action
  filterByName(event) {
    const query = event.target.value.toLowerCase();
    if (!query) {
      const toShow = this.template.querySelectorAll('.hide');
      toShow.forEach(x => {
        x.classList.remove('hide');
      });
      return;
    }
    const toShow = this.template.querySelectorAll(`li[data-name*="${query}"]`);
    const toHide = this.template.querySelectorAll(
      `li:not([data-name*="${query}"])`
    );
    toShow.forEach(x => x.classList.remove('hide'));
    toHide.forEach(x => x.classList.add('hide'));
    const sections = this.template.querySelectorAll('section');
    sections.forEach(section => {
      const n = section.querySelectorAll('li:not(.hide)').length;
      if (n < 1) {
        section.classList.add('hide');
      } else {
        section.classList.remove('hide');
      }
    });
  }
}

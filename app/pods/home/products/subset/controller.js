import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ProductsSubsetController extends Controller {
  @service store;

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
      this.groupBy = 'use';
    }
    if (this.isUse) {
      this.groupBy = 'family';
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

  get statuses() {
    return [
      {
        id: 'new',
        label: 'New',
        products: this.products.filterBy('new', true)
      },
      {
        id: 'popular',
        label: 'Popular',
        products: this.products.filterBy('popular', true)
      },
      {
        id: 'recommended',
        label: 'Recommended',
        products: this.products.rejectBy('new', true).rejectBy('popular', true)
      },
      {
        id: 'outdated',
        label: 'Outdated'
      },
      {
        id: 'out-of-production',
        label: 'Out of production'
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

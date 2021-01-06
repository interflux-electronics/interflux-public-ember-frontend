import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ProductsSubsetController extends Controller {
  @service store;

  @tracked groupBy = 'none'; // 'none', 'family', 'use', 'quality'

  @action
  setGroup() {
    console.log('on insert');
    if (this.isFamily) {
      console.log('is family, set use');
      this.groupBy = 'use';
    }
    if (this.isUse) {
      console.log('is use, set family');
      this.groupBy = 'family';
    }
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

  get groups() {
    const { groupBy } = this;

    if (groupBy === 'family') {
      console.debug('grouping by family');

      const uniq = this.products
        .mapBy('family')
        .sortBy('rank')
        .mapBy('id')
        .uniq();

      return uniq.map(id => {
        const family = this.store.peekRecord('product-family', id);

        return {
          id,
          title: family.get('label'),
          // description: family.get('description'),
          products: this.products.filterBy('family.id', id)
        };
      });
    }

    if (groupBy === 'use') {
      return this.uses.map(use => {
        return {
          id: use.id,
          icon: use.iconURL,
          title: use.get('label'),
          // description: use.get('gist'),
          products: this.products.filter(product => {
            return product
              .get('uses')
              .mapBy('id')
              .includes(use.id);
          })
        };
      });
    }

    if (groupBy === 'quality') {
      return this.qualities.map(quality => {
        return {
          id: quality.id,
          icon: quality.iconURL,
          title: quality.get('text'),
          // description: quality.get('gist'),
          products: this.products.filter(product => {
            return product
              .get('qualities')
              .mapBy('id')
              .includes(quality.id);
          })
        };
      });
    }

    return [];
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
    return '???';
  }
}

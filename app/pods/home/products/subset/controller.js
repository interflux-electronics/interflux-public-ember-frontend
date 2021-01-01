import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProductsSubsetController extends Controller {
  @tracked whitelist = [
    'soldering-fluxes',
    'solder-pastes',
    'solder-wires',
    'solder-alloys',
    'auxiliaries'
  ];

  get filters() {
    const families = [];
    const uses = [];

    // const families = this.model.families.sortBy('rank').map(family => {
    //   return {
    //     id: family.id,
    //     label: capitalize(family.namePlural),
    //     checked: this.whitelist.includes(family.id)
    //   };
    // });
    //
    // const uses = this.model.uses.map(use => {
    //   return {
    //     id: use.id,
    //     label: capitalize(use.text),
    //     checked: this.whitelist.includes(use.id)
    //   };
    // });

    return { families, uses };
  }

  groupBy = 'family'; // 'none', 'family', 'use', 'quality'

  get noGrouping() {
    return this.groupBy === 'none';
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

  get groups() {
    const { groupByFamily } = this;

    const arr = [];

    if (groupByFamily) {
      const families = this.products.mapBy('family');

      families.forEach(family => {
        const exists = arr.find(x => x.id === family.get('id'));

        if (!exists) {
          arr.push({
            id: family.get('id'),
            title: family.get('namePlural'),
            description: family.get('description'),
            products: family.get('products')
          });
        }
      });
    }

    // this.families.sortBy('rank').forEach(family => {
    //   const products = family.products.filter(product => {
    //     return this.whitelist.includes(product.family.get('id'));
    //   });
    //
    //   if (products.length) {
    //     arr.push({
    //       id: family.id,
    //       title: family.namePlural,
    //       description: family.description,
    //       products
    //     });
    //   }
    // });

    console.debug(arr);

    return arr;
  }

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
      return this.model.family.label;
    }
    if (this.isUse) {
      return `For ${this.model.use.text}`;
    }
    return '???';
  }

  get products() {
    if (this.isFamily) {
      return this.model.family.products;
    }
    if (this.isUse) {
      return this.model.use.products;
    }
    return [];
  }
}

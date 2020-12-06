import Controller from '@ember/controller';

export default class ProductsIndexController extends Controller {
  get filters() {
    return {
      families: [
        {
          id: 'soldering-fluxes',
          label: 'Soldering fluxes',
          checked: true
        },
        {
          id: 'solder-pastes',
          label: 'Solder pastes',
          checked: false
        }
      ]
    };
  }

  get families() {
    const arr = [];
    const { families, products } = this.model;

    families.sortBy('rank').forEach(family => {
      arr.push({
        label: family.namePlural,
        description: family.description,
        products: family.products
      });
    });

    return arr;
  }
}

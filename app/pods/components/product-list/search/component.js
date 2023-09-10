import Component from '@glimmer/component';

export default class ProductListSearchComponent extends Component {
  // @arg products
  // @arg search

  get products() {
    return this.args.products.sortBy('statusRank', 'name');
  }
}

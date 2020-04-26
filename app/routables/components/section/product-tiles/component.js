import Component from '@glimmer/component';

export default class SectionProductTilesComponent extends Component {
  get sortedProducts() {
    const featured = this.args.products
      .filterBy('featured')
      .sortBy('order', 'name');

    const hidden = this.args.products
      .rejectBy('featured')
      .sortBy('order', 'name');

    const arr = [...featured, ...hidden];

    return arr;
  }
}

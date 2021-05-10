import Component from '@glimmer/component';

export default class ProductRowComponent extends Component {
  get features() {
    const uses = this.args.product.productUsesSorted
      .filterBy('showOnProductList')
      .mapBy('use');

    const qualities = this.args.product.productQualitiesSorted
      .filterBy('showOnProductList')
      .mapBy('quality');

    return [...uses, ...qualities].slice(0, 5);
  }
}

import Component from '@glimmer/component';

export default class ProductRowComponent extends Component {
  get features() {
    const { product } = this.args;

    const uses = product.productUsesSorted
      ? product.productUsesSorted.filterBy('showOnProductList').mapBy('use')
      : [];

    const qualities = product.productQualitiesSorted
      ? product.productQualitiesSorted
          .filterBy('showOnProductList')
          .mapBy('quality')
      : [];

    return [...uses, ...qualities];
  }
}

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ProductCardComponent extends Component {
  @service media;

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

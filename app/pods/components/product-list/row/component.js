import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ProductGroupPageProductComponent extends Component {
  @service media;

  get features() {
    const { product } = this.args;

    const uses = product.get('productUsesSorted')
      ? product
          .get('productUsesSorted')
          .filterBy('showOnProductList')
          .mapBy('use')
      : [];

    const qualities = product.get('productQualitiesSorted')
      ? product
          .get('productQualitiesSorted')
          .filterBy('showOnProductList')
          .mapBy('quality')
      : [];

    return [...uses, ...qualities];
  }
}

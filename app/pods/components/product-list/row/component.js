import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ProductListRowomponent extends Component {
  // @arg product
  // @arg search

  @service media;

  get classes() {
    return [
      'row',
      this.args.product.get('status'),
      this.args.layout,
      this.searchMatch ? 'match' : 'hide'
    ].join(' ');
  }

  get searchMatch() {
    if (!this.args.search) {
      return true;
    }

    const search = this.args.search.toLowerCase();
    const product = this.args.product;
    const name = product.name.toLowerCase();
    const pitch = product.pitch ? product.pitch.toLowerCase() : '';

    return name.includes(search) || pitch.includes(search);
  }

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

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ProductListRowomponent extends Component {
  // @arg product
  // @arg search

  @service media;
  @service translation;

  get classes() {
    return [
      'row',
      this.args.product.get('status'),
      this.args.layout,
      this.searchMatch ? 'match' : 'hide'
    ].join(' ');
  }

  get searchMatch() {
    // Show if there is no search query.
    if (!this.args.search) {
      return true;
    }

    const search = this.args.search.toLowerCase();
    const product = this.args.product;
    const name = product.name.toLowerCase();

    // Show if the search term matches the search query.
    if (name.includes(search)) {
      return true;
    }

    // Hide if name does not match and product has no pitch.
    if (!product.pitch) {
      return false;
    }

    // Hide if the product has a superior product. This will hide the pitch.
    if (product.superiorProduct.get('id')) {
      return false;
    }

    const pitch = this.translation
      .t(product.pitch, 'product.2', product.id)
      .toLowerCase();

    // Show if the first 180 characters of the pitch contain the search term.
    return pitch.slice(0, 180).includes(search);
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

  get replacedBy() {
    const { product } = this.args;
    const a = product.get('name');
    const b = product.get('superiorProduct.name');
    const id = product.get('id');

    return this.translation.t(
      `${a} has been replaced by ${b}.`,
      'product.34',
      id
    );
  }
}

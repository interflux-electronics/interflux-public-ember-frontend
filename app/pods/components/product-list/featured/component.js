import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProductListFeaturedComponent extends Component {
  @tracked show = false;

  @action
  onClick() {
    this.show = !this.show;
  }

  get count() {
    return this.args.products.length;
  }

  get hasHiddenProducts() {
    return this.count > 0;
  }

  get rows() {
    const { products, productUses } = this.args;

    if (!productUses) {
      return products.map((product) => {
        return { product };
      });
    }

    return products.map((product) => {
      const productUse = productUses.findBy('product.id', product.get('id'));
      const alternativeAvatar =
        productUse && productUse.showAlternativeAvatar && productUse.image
          ? productUse.image
          : null;

      // TODO: remove after testing in production
      if (alternativeAvatar) {
        console.warn(
          'alternativeAvatar',
          productUse.get('use.name'),
          alternativeAvatar.get('path')
        );
      }

      return { product, alternativeAvatar };
    });
  }
}

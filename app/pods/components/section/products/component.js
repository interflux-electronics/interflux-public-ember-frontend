import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { computed } from '@ember/object';

export default class SectionProductComponent extends Component {
  @tracked showAll;

  @action
  toggle() {
    this.showAll = !this.showAll;
  }

  get productsForFeature() {
    if (!this.args.feature) {
      return this.args.products;
    }
    return this.args.products.filter(p => {
      return p.features.any(f => {
        return f.slug === this.args.feature;
      });
    });
  }

  get featuredProducts() {
    return this.productsForFeature.filterBy('featured').sortBy('order', 'name');
  }

  get hiddenProducts() {
    return this.productsForFeature.rejectBy('featured').sortBy('order', 'name');
  }

  get hiddenCount() {
    return this.hiddenProducts.length;
  }

  @computed('featuredProducts.length', 'productsForFeature.length', 'showAll')
  get count() {
    if (this.showAll) {
      return this.productsForFeature.length;
    } else {
      return this.featuredProducts.length;
    }
  }
}

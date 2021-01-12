import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ProductsSubsetController extends Controller {
  @service store;
  @service router;

  get isFamily() {
    return this.model.family ? true : false;
  }

  get isUse() {
    return this.model.use ? true : false;
  }

  get pageTitle() {
    if (this.isFamily) {
      return this.model.family.get('label');
    }
    if (this.isUse) {
      return `For ${this.model.use.get('text')}`;
    }
    return '?';
  }

  get searchPlaceHolder() {
    return (
      this.products
        .sortBy('rank')
        .firstObject.get('name')
        .slice(0, -1) + '...'
    );
  }

  delay(ms) {
    return new Promise(approve => {
      window.setTimeout(approve, ms);
    });
  }

  @tracked groupBy = 'status'; // 'status', 'family', 'use', 'quality'

  @action
  onInsert() {
    // TODO: Set group to something else than status?
  }

  // By adding a render delay, the UI will feel less sluggish. The <aside> panel buttons and
  // checkboxes will respond instantly. The slower, heaver render of the products is deferred.
  @action
  async setGroup(name) {
    this.groupBy = name;
    await this.delay(1);
    this.refreshSubsets();
  }

  @action
  refreshSubsets() {
    this.subsets = this.groupByStatus
      ? this.statusSubsets
      : this.groupByQuality
      ? this.qualitySubsets
      : this.groupByUse
      ? this.useSubsets
      : this.groupByFamily
      ? this.familySubsets
      : null;
  }

  get groupByStatus() {
    return this.groupBy === 'status';
  }

  get groupByFamily() {
    return this.groupBy === 'family';
  }

  get groupByUse() {
    return this.groupBy === 'use';
  }

  get groupByQuality() {
    return this.groupBy === 'quality';
  }

  get products() {
    if (this.isFamily) {
      return this.model.family.get('products');
    }
    if (this.isUse) {
      return this.model.use.get('products');
    }
    return [];
  }

  @tracked subsets = this.statusSubsets;

  get familySubsets() {
    const uniq = this.products
      .mapBy('family')
      .filter(family => {
        return !this.familyHideList.includes(family.get('id'));
      })
      .sortBy('rank')
      .mapBy('id')
      .uniq();

    return uniq.map(id => {
      const family = this.store.peekRecord('product-family', id);
      const label = family.label;
      const products = this.products.filterBy('family.id', id);

      return { id, label, products };
    });
  }

  get useSubsets() {
    return this.uses
      .filter(use => {
        return !this.useHideList.includes(use.id);
      })
      .map(use => {
        const { id, label, iconURL } = use;
        const products = this.products.filter(product => {
          return product
            .get('uses')
            .mapBy('id')
            .includes(use.id);
        });

        return { id, label, iconURL, products };
      });
  }

  get qualitySubsets() {
    return this.qualities
      .filter(quality => {
        return !this.qualityHideList.includes(quality.id);
      })
      .map(quality => {
        const { id, label, iconURL } = quality;
        const products = this.products.filter(product => {
          return product
            .get('qualities')
            .mapBy('id')
            .includes(quality.id);
        });

        return { id, label, iconURL, products };
      });
  }

  get statusSubsets() {
    const arr = [];

    this.statuses
      .filter(status => {
        return !this.statusHideList.includes(status.id);
      })
      .forEach(status => {
        const products = this.products
          .filterBy('status', status.id)
          .sortBy('rank');

        if (products.length) {
          arr.push({ ...status, products });
        }
      });

    return arr;
  }

  get statuses() {
    return [
      {
        id: 'new',
        label: 'New',
        blurb: 'The newest in soldering chemistry.'
      },
      {
        id: 'popular',
        label: 'Popular',
        blurb: 'In high demand for years.'
      },
      {
        id: 'recommended',
        label: 'Recommended',
        blurb: 'Niche products for specific use cases.'
      },
      {
        id: 'outdated',
        label: 'Outdated',
        blurb:
          'At Interflux we continuously improve the chemistry and production techniques of our products. As we innovate, some products will become outdated. This means a better product is available. Outdated products are still in production and can still be ordered. However, consider upgrading soon!'
      },
      {
        id: 'discontinued',
        label: 'Discontinued',
        blurb:
          'When products are outdated and nobody is ordering them anymore, we take them out of production (discontinued). For reference, we keep them available on our website.'
      }
    ];
  }

  get families() {
    const uniq = this.products.mapBy('family.id').uniq();

    return uniq
      .map(id => this.store.peekRecord('product-family', id))
      .sortBy('rank');
  }

  get uses() {
    const uniq = this.products
      .mapBy('uses')
      .map(arr => {
        return arr.mapBy('id');
      })
      .flat()
      .uniq();

    return uniq.map(id => this.store.peekRecord('use', id)).sortBy('rank');
  }

  get qualities() {
    const uniq = this.products
      .mapBy('qualities')
      .map(arr => {
        return arr.mapBy('id');
      })
      .flat()
      .uniq();

    return uniq.map(id => this.store.peekRecord('quality', id)).sortBy('rank');
  }

  @action
  openProductPage(product) {
    this.router.transitionTo('home.product', product.id);
  }

  @tracked statusHideList = ['outdated', 'discontinued'];
  @tracked familyHideList = [];
  @tracked useHideList = [];
  @tracked qualityHideList = [];

  get checkboxLabel() {
    return this.groupByStatus
      ? 'Statuses'
      : this.groupByQuality
      ? 'Qualities'
      : this.groupByUse
      ? 'Processes'
      : this.groupByFamily
      ? 'Product families'
      : null;
  }

  get checkboxes() {
    if (this.groupByStatus) {
      const { statuses, statusHideList } = this;

      return statuses.map(status => {
        const id = status.id;
        const label = status.label;
        const checked = !statusHideList.includes(id);

        return { id, label, checked };
      });
    }

    if (this.groupByFamily) {
      const { families, familyHideList } = this;

      return families.map(family => {
        const id = family.id;
        const label = family.namePlural;
        const checked = !familyHideList.includes(id);

        return { id, label, checked };
      });
    }

    if (this.groupByQuality) {
      const { qualities, qualityHideList } = this;

      return qualities.map(use => {
        const id = use.id;
        const label = use.label;
        const checked = !qualityHideList.includes(id);

        return { id, label, checked };
      });
    }

    if (this.groupByUse) {
      const { uses, useHideList } = this;

      return uses.map(use => {
        const id = use.id;
        const label = `For ${use.text}`;
        const checked = !useHideList.includes(id);

        return { id, label, checked };
      });
    }

    return [];
  }

  @action
  toggleCheckbox(id) {
    if (this.groupByStatus) {
      const arr = this.statusHideList;
      if (arr.includes(id)) {
        this.statusHideList = arr.filter(x => x !== id);
      } else {
        this.statusHideList = arr.concat([id]);
      }
    }

    if (this.groupByFamily) {
      const arr = this.familyHideList;
      if (arr.includes(id)) {
        this.familyHideList = arr.filter(x => x !== id);
      } else {
        this.familyHideList = arr.concat([id]);
      }
    }

    if (this.groupByUse) {
      const arr = this.useHideList;
      if (arr.includes(id)) {
        this.useHideList = arr.filter(x => x !== id);
      } else {
        this.useHideList = arr.concat([id]);
      }
    }

    if (this.groupByQuality) {
      const arr = this.qualityHideList;
      if (arr.includes(id)) {
        this.qualityHideList = arr.filter(x => x !== id);
      } else {
        this.qualityHideList = arr.concat([id]);
      }
    }

    this.refreshSubsets();
  }
}

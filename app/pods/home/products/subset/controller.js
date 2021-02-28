import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ProductsSubsetController extends Controller {
  @service store;
  @service router;

  @tracked family; // The family record matching the slug in the URL
  @tracked use; // The use record matching the slug in the URL
  @tracked statuses;
  @tracked shownStatuses = ['new', 'popular', 'recommended'];

  main; // The <main> element in the DOM

  @action
  async onInsert(main) {
    // Remember the <main> element for later use.
    this.main = main;

    // Set the model records locally so we can overwrite them with our radio buttons.
    this.family = this.model.family;
    this.use = this.model.use;

    this.renderStatusSections();

    await this.delay(1); // Allow all <section> to be rendered first

    this.filterAndSortProducts();
    this.filterSections();
  }

  // Rendering all products is a heavy operation which we do not want to trigger every time the
  // filters update. Thus we only run it once on initial render. All products are rendered onto
  // one page, dividided in one <section> per status. It's only moments after we will use query
  // selectors to hide, show and sort the products.
  //
  renderStatusSections() {
    const arr = [
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
        blurb: 'Niche products, often for specialised use cases.'
      },
      {
        id: 'outdated',
        label: 'Outdated',
        blurb: `At Interflux we continuously improve the chemistry and production techniques of our products. As we innovate, some products will become outdated. This means a better product is available. Outdated products are still in production and can still be ordered. However, consider upgrading soon!`
      },
      {
        id: 'discontinued',
        label: 'Discontinued',
        blurb: `When products are outdated and nobody is ordering them anymore, we take them out of production (discontinued). For reference, we keep them available on our website.`
      }
    ];

    arr.forEach(status => {
      status.products = this.model.products.filter(p => p.status === status.id);
    });

    this.statuses = arr;
  }

  filterAndSortProducts() {
    const { main, statuses, family, use } = this;

    main.querySelectorAll('li.product-row').forEach(li => {
      li.classList.add('hide');
      li.style.order = 9999;
    });

    const productSubset = family ? family.productsByRank : use.productsByRank;

    statuses.forEach(status => {
      const section = main.querySelector(`section#${status.id}`);
      const productsForStatus = productSubset.filterBy('status', status.id);

      productsForStatus.filterBy('status', status.id).forEach((product, i) => {
        const id = product.get('id');
        const li = section.querySelector(`li.product-row#${id}`);
        li.classList.remove('hide');
        li.style.order = i;
      });

      if (productsForStatus.length > 0) {
        section.classList.add('has-products');
        section.classList.remove('no-products');
      } else {
        section.classList.remove('has-products');
        section.classList.add('no-products');
      }
    });
  }

  filterSections() {
    const { main, statuses, shownStatuses } = this;

    statuses.forEach(status => {
      const section = main.querySelector(`section#${status.id}`);
      const show =
        section.classList.contains('has-products') &&
        shownStatuses.includes(status.id);

      if (show) {
        section.classList.remove('hide');
      } else {
        section.classList.add('hide');
      }
    });
  }

  get pageTitle() {
    const { family, use } = this;
    if (family) {
      return family.get('label');
    }
    if (use) {
      return `For ${use.get('text')}`;
    }
    return '?';
  }

  // TODO: add smarts
  get searchPlaceHolder() {
    return 'LMPA Q6';
  }

  delay(ms) {
    return new Promise(approve => {
      window.setTimeout(approve, ms);
    });
  }

  get familyRadios() {
    return this.model.families.sortBy('rank').map(family => {
      const label = family.namePlural;
      const slug = family.slug;
      const isChecked = this.family && this.family.slug === slug;

      return { label, slug, isChecked };
    });
  }

  get useRadios() {
    return this.model.uses.sortBy('rank').map(use => {
      const label = `For ${use.text}`;
      const slug = `for-${use.slug}`;
      const isChecked = this.use && this.use.slug === use.slug;

      return { label, slug, isChecked };
    });
  }

  get statusCheckboxes() {
    const { statuses, family, use } = this;

    if (!statuses) {
      return [];
    }

    const productSubset = family ? family.productsByRank : use.productsByRank;

    return statuses.map(status => {
      const { id, label } = status;
      const isChecked = this.shownStatuses.includes(id);
      const productsForStatus = productSubset.filterBy('status', status.id);
      const count = productsForStatus.length;

      return { id, label, isChecked, count };
    });
  }

  @action
  toggleStatus(id) {
    const arr = this.shownStatuses;

    // If status is shown, then hide it.
    // If status is hidden, then show it.
    if (arr.includes(id)) {
      this.shownStatuses = arr.filter(x => x !== id);
    } else {
      this.shownStatuses = arr.concat([id]);
    }

    this.filterSections();
  }

  @action
  openSubsetPage(slug) {
    if (slug.startsWith('for-')) {
      this.use = this.model.uses.find(use => use.slug === slug.slice(4));
      this.family = null;
    } else {
      this.family = this.model.families.find(family => family.slug === slug);
      this.use = null;
    }

    this.filterAndSortProducts();
    this.filterSections();

    window.scrollTo({
      top: this.main.offsetTop,
      left: 100,
      behavior: 'smooth'
    });
  }

  @action
  openProductPage(product) {
    this.router.transitionTo('home.product', product.id);
  }
}

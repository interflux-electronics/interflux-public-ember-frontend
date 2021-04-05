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

    await this.delay(1); // Allow all <section> to be rendered first

    this.filterAndSortProducts();
  }

  statuses = [
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
      blurb: 'Our main stream products.'
    },
    {
      id: 'outdated',
      label: 'Legacy',
      blurb: `These products are the precursors of even better products. At Interflux we continuously do research to find better soldering chemistry and to improve our production techniques. As we innovate, some products are replaced by new better products. You can still order legacy products. We still produce them. But, do consider upgrading!`
    },
    {
      id: 'discontinued',
      label: 'Out of production',
      blurb: `These products can no longer be ordered. We keep them on our website for reference only.`
    }
  ];

  filterAndSortProducts() {
    const { main, family, use, shownStatuses } = this;
    const { products } = this.model;

    // TODO: enter loading state

    // First we hide all <li>
    main.querySelectorAll('li').forEach(li => {
      li.classList.add('hide');
      li.style.order = null;
    });

    // For robust sorting
    const n = products.length;

    // If the subset is a use (process) we group by family
    if (use) {
      // Show only the products of the use and sort
      use.families
        .filterBy('isMainFamily')
        .sortBy('rank')
        .forEach((family, i) => {
          const id = family.get('id');
          const li = main.querySelector(`li.main-family-for-use#${id}`);

          if (!li) {
            console.warn('NOT FOUND', id);
            return;
          }

          // Iterate over all products which have this use and family and which status is shown.
          use
            .get('productsByRank')
            .filterBy('family.id', family.get('id'))
            .filter(product => shownStatuses.includes(product.get('status')))
            .forEach((product, ii) => {
              const id2 = product.get('id');
              const li2 = main.querySelector(`li.product-row#${id2}`);

              // Show and sort the family header
              li.classList.remove('hide');
              li.style.order = i * n;

              // Show and sort all products of that family
              li2.style.order = i * n + ii;
              li2.classList.remove('hide');
            });
        });
    }

    // If the subset is a family we use different grouping per family
    if (family) {
      family.subFamilies.sortBy('rank').forEach((subFamily, i) => {
        const id = subFamily.get('id');
        const li = main.querySelector(`li.sub-family#${id}`);

        subFamily
          .get('productsByRank')
          .filter(product => shownStatuses.includes(product.get('status')))
          .forEach((product, ii) => {
            const id2 = product.get('id');
            const li2 = main.querySelector(`li.product-row#${id2}`);

            // Show and sort the sub family header
            li.classList.remove('hide');
            li.style.order = i * n;

            // Show and sort all products of that sub family
            li2.style.order = i * n + ii;
            li2.classList.remove('hide');
          });
      });

      const id = family.get('id');
      const li = main.querySelector(`li.sub-family#other-${id}`);
      const i = 999;

      family
        .get('productsByRank')
        .filter(product => shownStatuses.includes(product.get('status')))
        .forEach((product, ii) => {
          console.log('product', product.name);
          const id2 = product.get('id');
          const li2 = main.querySelector(`li.product-row#${id2}`);

          // Show and sort the sub family header
          if (li) {
            li.classList.remove('hide');
            li.style.order = i * n;
          } else {
            console.warn(`cannot find: li.sub-family#other-${id}`);
          }

          // Show and sort all products of that sub family
          if (li2) {
            li2.style.order = i * n + ii;
            li2.classList.remove('hide');
          } else {
            console.warn(`cannot find: li.product-row#${id2}`);
          }
        });
    }
  }

  get pageTitle() {
    const { family, use } = this;
    if (family) {
      return family.get('label');
    }
    if (use) {
      return use.get('forLabel');
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
    return this.model.families
      .filterBy('isMainFamily')
      .sortBy('rank')
      .map(family => {
        const label = family.label;
        const slug = family.slug;
        const isChecked = this.family && this.family.slug === slug;

        return { label, slug, isChecked };
      });
  }

  get useRadios() {
    return this.model.uses.sortBy('rank').map(use => {
      const label = use.label;
      const slug = `for-${use.slug}`;
      const isChecked = this.use && this.use.slug === use.slug;

      return { label, slug, isChecked };
    });
  }

  get statusCheckboxes() {
    const { statuses } = this;

    if (!statuses) {
      return [];
    }

    // const productSubset = family ? family.productsByRank : use.productsByRank;

    return statuses.map(status => {
      const { id, label } = status;
      const isChecked = this.shownStatuses.includes(id);
      const count = '?';
      // const productsForStatus = productSubset.filterBy('status', status.id);
      // const count = productsForStatus.length;

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

    this.filterAndSortProducts();
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

  get mainFamilies() {
    return this.model.families.filterBy('isMainFamily');
  }

  get subFamilies() {
    return this.model.families.filterBy('isSubFamily');
  }

  get sortedProducts() {
    return this.model.products.sortBy('name');
  }
}

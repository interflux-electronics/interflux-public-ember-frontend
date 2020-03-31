import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(params) {
    const slug = params.family_slug;
    const family = this.store.peekAll('product-family').findBy('slug', slug);
    const products = this.store
      .peekAll('product')
      .filterBy('family.slug', slug);

    return RSVP.hash({ family, products });
  }
});

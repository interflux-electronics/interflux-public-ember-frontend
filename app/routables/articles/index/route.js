import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class ArticlesIndexRoute extends Route {
  @service store;

  model() {
    return hash({
      articles: this.store.findAll('article')
    });
  }
}

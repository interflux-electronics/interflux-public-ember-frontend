import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  elementId: 'feeds-page',

  store: service(),

  articles: undefined, // passed in

  articlesSorted: computed('articles.[]', function() {
    return this.articles.sortBy('createdAt').reverse();
  }),

  create: action(function() {
    const now = new Date();
    this.store.createRecord('article', { createdAt: now });
    const records = this.store.peekAll('article');
    this.set('articles', records);
  })
});

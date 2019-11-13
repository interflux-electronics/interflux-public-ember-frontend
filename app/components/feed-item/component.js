import Component from '@ember/component';
import { action } from '@ember/object';

export default Component.extend({
  tagName: 'li',
  classNames: ['feed-item'],

  init() {
    this._super(...arguments);
    if (this.article.isNew) {
      this.set('editing', true);
    }
  },

  loading: false,
  editing: false,

  edit: action(function() {
    this.set('editing', true);
  }),

  cancel: action(function() {
    this.set('editing', false);
    if (this.article.isNew) {
      this.delete(this.article);
    }
  }),

  save: action(function(article) {
    this.set('loading', true);
    article
      .save()
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        this.set('loading', false);
        this.set('editing', false);
      });
  }),

  delete: action(function(article) {
    this.set('loading', true);
    article.deleteRecord();
    article
      .save()
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        this.set('loading', false);
      });
  })
});

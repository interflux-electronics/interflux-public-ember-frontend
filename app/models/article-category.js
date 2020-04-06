import Model, { attr, hasMany } from '@ember-data/model';

export default class ArticleCategoryModel extends Model {
  @attr('string') slug;
  @attr('string') name;

  @hasMany('article') articles;
}

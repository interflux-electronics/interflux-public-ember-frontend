import Model, { attr, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class ArticleCategoryModel extends Model {
  @alias('id') slug;
  @attr('string') name;

  @hasMany('article') articles;
}

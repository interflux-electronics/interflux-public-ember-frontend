import Model, { attr, belongsTo } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class ArticleModel extends Model {
  @attr('string') slug;
  @attr('string') title;
  @attr('string') body;
  @attr('string') createdAt;
  @attr('string') updatedAt;

  @alias('articleCategory') category;

  @belongsTo('article-category') articleCategory;
}

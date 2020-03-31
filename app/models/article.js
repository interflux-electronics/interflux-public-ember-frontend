import Model, { attr } from '@ember-data/model';

export default class ArticleModel extends Model {
  @attr('string') slug;
  @attr('string') title;
  @attr('string') body;
  @attr('string') createdAt;
  @attr('string') updatedAt;
}

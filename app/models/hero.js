import Model, { attr } from '@ember-data/model';

export default class HeroModel extends Model {
  @attr('string') group;
  @attr('string') route;
  @attr('string') title;
  @attr('string') sub;
}

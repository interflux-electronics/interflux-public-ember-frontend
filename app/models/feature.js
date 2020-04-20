import Model, { attr, hasMany } from '@ember-data/model';

export default class FeatureModel extends Model {
  @attr('string') slug;
  @attr('string') icon;
  @attr('string') text;
  @attr('string') gist;

  @hasMany('product') products;

  get isProcess() {
    console.log(this.text);
    return this.text.startsWith('For');
  }
}

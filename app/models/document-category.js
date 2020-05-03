import Model, { attr, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class DocumentCategoryModel extends Model {
  @alias('id') slug;
  @attr('string') slug;
  @attr('string') name;
  @attr('string') gist;
  @attr('string') icon;

  @hasMany('document') documents;

  get cta() {
    return this.slug === 'REACH' || this.slug === 'SDS'
      ? 'request'
      : 'download';
  }
}

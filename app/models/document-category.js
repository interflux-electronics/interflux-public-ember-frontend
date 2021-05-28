import Model, { attr, hasMany } from '@ember-data/model';

export default class DocumentCategoryModel extends Model {
  @attr('string') slug;
  @attr('string') name;
  @attr('string') gist;
  @attr('string') icon;
  @attr('number') order;

  @hasMany('document') documents;

  get cta() {
    return this.slug === 'REACH' || this.slug === 'SDS'
      ? 'request'
      : 'download';
  }
}

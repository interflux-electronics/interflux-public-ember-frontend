import Model, { attr, hasMany } from '@ember-data/model';

export default class DocumentCategoryModel extends Model {
  @attr('string') slug;
  @attr('string') name;
  @attr('string') gist;
  @attr('string') icon;
  @attr('number') order;

  @hasMany('document') documents;

  get hasToBeRequested() {
    return this.slug === 'REACH' || this.slug === 'SDS';
  }

  get cta() {
    return this.hasToBeRequested ? 'request' : 'download';
  }

  get hasDocuments() {
    if (this.hasToBeRequested) {
      return true;
    }

    return this.documents.length > 0;
  }
}

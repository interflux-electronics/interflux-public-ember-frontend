import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import ENV from 'interflux/config/environment';

export default class DocumentModel extends Model {
  @attr('string') path;
  @attr('string') name;
  @attr('string') variations;

  @belongsTo('document-category') documentCategory;
  @alias('documentCategory') category;

  @hasMany('product') products;
  @hasMany('product-document') productDocuments;

  // Not needed on public site:
  // @hasMany('cdn-file') cdnFiles;
  // @alias('cdnFiles') files;

  get files() {
    if (!this.variations) {
      return [];
    }

    return this.variations.split(',').map(v => {
      const url = `${ENV.cdnHost}/${this.path}-${v}`;
      const locale = v.split('.')[0];
      const language = {
        EN: 'English',
        DE: 'Deutsch',
        FR: 'Français',
        JP: '日本語'
      }[locale];

      return { url, language };
    });
  }
}

import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import ENV from 'interflux/config/environment';

export default class DocumentModel extends Model {
  @attr('string') path;
  @attr('string') name;
  @attr('string') variations;

  @belongsTo('document-category') documentCategory;

  get category() {
    return this.documentCategory;
  }

  @hasMany('product') products;
  @hasMany('product-document') productDocuments;

  get files() {
    if (!this.variations) {
      return [];
    }

    return this.variations.split(',').map((v) => {
      const url = `${ENV.cdnHost}/${this.path}-${v}`;
      const locale = v.split('.')[0];
      const language = {
        EN: 'English',
        DE: 'Deutsch',
        FR: 'Français',
        JA: '日本語'
      }[locale];

      return { url, language };
    });
  }
}

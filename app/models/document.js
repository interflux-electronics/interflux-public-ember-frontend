import Model, { attr, belongsTo } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class DocumentModel extends Model {
  @attr('string') path;
  @attr('string') name;

  @alias('documentCategory') category;

  @belongsTo('document-category') documentCategory;
  @belongsTo('language') language;
  @belongsTo('product') product;
}

import Model, { attr, hasMany } from '@ember-data/model';

export default class DocumentCategoryModel extends Model {
  @attr('string') slug;
  @attr('string') name;
  // @attr('string') gist;

  @hasMany('document') documents;

  get gist() {
    return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
  }
}

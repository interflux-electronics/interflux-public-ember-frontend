import Model, { attr, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class ProductFamilyModel extends Model {
  @alias('id') slug;
  @attr('string') nameSingle;
  @attr('string') namePlural;
  @attr('string') gist;
  @attr('number') order;

  @hasMany('product') products;
  @hasMany('image') images;

  get count() {
    return this.products.length;
  }

  get rank() {
    return this.order || 999;
  }

  // get description() {
  //   // return 'Soldering fluxes are water, alcohol or rosin based liquids used for soldering electronics. Typicially these are sprayed or jetted onto circuit boards and evaporated during preheating, and do their activation when they come in contact with the liquid metal waves or nozzles.';
  //   // return 'Soldering wires are metal wires with a rosin soldering flux at their core. These are most commonly used for hand soldering small patches that need rework or repair. New upcoming techniques are robot and laser soldering.';
  // }

  // Returns plural family name with first letter capitalised
  get label() {
    const str = this.namePlural || '';
    return str[0].toUpperCase() + str.slice(1);
  }
}

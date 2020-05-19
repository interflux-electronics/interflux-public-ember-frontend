import Model, { attr, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';

const heros = {
  'wave-soldering': 'heros/wave-soldering-1',
  'selective-soldering': 'heros/selective-soldering-1',
  'reflow-soldering': 'heros/reflow-soldering-1',
  'stencil-printing': 'heros/stencil-printing-1',
  'OSP-soldering': 'heros/osp-soldering-1',
  'pre-tinning': 'heros/selective-soldering-2',
  'rework-and-repair': 'heros/rework-and-repair-1',
  'hand-soldering': 'Ersa-3',
  'robot-soldering': 'robot-soldering/Promation-1',
  'laser-soldering': 'laser-soldering/Wolf-1',
  'spray-fluxing': 'circuit-board-4',
  'foam-fluxing': 'Ersa-5',
  'jet-fluxing': 'Ersa-5',
  'solder-paste-jetting': 'Ersa-5',
  'vapor-phase-soldering': 'Ersa-5',
  'dip-soldering': 'Ersa-5',
  dispensing: 'Ersa-5',
  'solder-bath-conditioning': 'Ersa-5',
  'general-cleaning': 'Ersa-5'
};

export default class FeatureModel extends Model {
  @attr('string') slug;
  @attr('string') icon;
  @attr('string') text;
  @alias('text') name;
  @attr('string') gist;
  @attr('string') category;
  @attr('boolean') hasPage;

  @hasMany('product') products;

  get hero() {
    return heros[this.slug];
  }

  get order() {
    return Object.keys(heros).indexOf(this.slug) + 1;
  }

  get families() {
    return this.products.mapBy('family').uniqBy('id');
  }
}

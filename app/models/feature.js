import Model, { attr, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';

const heros = {
  'wave-soldering': 'Ersa-6',
  'selective-soldering': 'Ersa-29',
  'reflow-soldering': 'Ersa-11',
  'stencil-printing': 'Ersa-8',
  'OSP-soldering': 'circuit-board-2',
  'pre-tinning': 'circuit-board-3',
  'rework-and-repair': 'circuit-board-1',
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

  @hasMany('product') products;

  get hero() {
    return heros[this.slug];
  }

  get order() {
    return Object.keys(heros).indexOf(this.slug) + 1;
  }
}

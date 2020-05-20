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
  'hand-soldering': 'heros/selective-soldering-2',
  'robot-soldering': 'heros/selective-soldering-2',
  'laser-soldering': 'heros/selective-soldering-2',
  'spray-fluxing': 'heros/selective-soldering-2',
  'foam-fluxing': 'heros/selective-soldering-2',
  'jet-fluxing': 'heros/selective-soldering-2',
  'solder-paste-jetting': 'heros/selective-soldering-2',
  'vapor-phase-soldering': 'heros/selective-soldering-2',
  'dip-soldering': 'heros/selective-soldering-2',
  dispensing: 'heros/selective-soldering-2',
  'solder-bath-conditioning': 'heros/selective-soldering-2',
  'general-cleaning': 'heros/selective-soldering-2'
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

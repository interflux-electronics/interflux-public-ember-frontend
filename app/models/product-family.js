import Model, { attr, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';

const heros = {
  'soldering-fluxes': [
    'images/products/IF-2005M/IF-2005M-10L-angle',
    'images/products/Pacific-2009M/Pacific-2009M-bottles-3',
    'images/products/SelectIF-2040/SelectIF-2040-10L-angle',
    'images/products/IF-2005M-025/IF-2005M-025-200L'
  ],
  'solder-pastes': [
    'images/products/LMPA-Q6/LMPA-Q6-500g',
    'images/products/LP-5720/LP-5720-SnAgCu-syringes',
    'images/products/micro-dIFe-7/micro-dIFe-7-2',
    'images/products/LMPA-Q6/LMPA-Q6-demo-5-cutout'
  ],
  'solder-wires': [
    'images/products/Laser-25/Laser-25-SnCu-500g',
    'images/products/NH-1/NH-1-SnAgCu-100g',
    'images/products/NH-1/NH-1-SnCu-500g-cutout',
    'images/products/Aquasol-4018/Aquasol-4018-solder-wire-SnPb-500g'
  ],
  'solder-alloys': [
    'images/products/Solder-Bars/Solder-Bars-15',
    'images/products/Plain-Solder-Wires/Plain-Solder-Wire-SnPb-4kg',
    'images/products/Solder-Pellets/Solder-Pellets-3',
    'images/products/Solder-Stones/Solder-Stones-3'
  ],
  auxiliaries: [
    'images/products/Purgel/Purgel-2',
    'images/products/Tip-Tinner/Tip-Tinner-4',
    'images/products/LMPA-Oil/LMPA-Oil',
    'images/products/Flux-Pen/Flux-Pen-set-2'
  ],
  'fluxing-systems': [
    'images/products/ICSF-Select/ICSF-Select-5-closeup',
    'images/products/ICSF-Select/ICSF-Select-1',
    'images/products/ICSF-Select/ICSF-Select-19-closeup',
    'images/products/ICSF-Select/ICSF-Select-8-closeup'
  ]
};

const subs = {
  'soldering-fluxes': [
    {}
    // 'alcohol-based',
    // 'water-based',
    // 'low-VOC',
    // 'rework-and-repair'
  ],
  'solder-pastes': [
    {}
    // 'water-soluble',
    // 'low-temperature'
  ],
  'solder-wires': [
    {}
    // 'hand-soldering',
    // 'laser-soldering',
    // 'robot-soldering',
    // 'lead-based-alloys',
    // 'lead-free-alloys'
    // 'rework-and-repair',
    // 'halide-free'
  ],
  'solder-alloys': [{}],
  auxiliaries: [{}],
  'fluxing-systems': [
    {
      title: 'Stand-alone fluxing systems',
      text:
        'Stand-alone fluxing systems is a self contained machine which you feed circuit boards and it will intelligently jet soldering flux precisely where you need it to be.',
      filter: 'stand-alone-system'
    },
    {
      title: 'Retrofit fluxing systems',
      text:
        'Retrofit fluxing systems can be mounted into your existing wave soldering setup whereever you need the fluxing to occur.',
      filter: 'retrofit-system'
    }
  ]
};

export default class ProductFamilyModel extends Model {
  @alias('id') slug;
  @attr('string') nameSingle;
  @attr('string') namePlural;
  @attr('number') order;

  @hasMany('product') products;

  get count() {
    return this.products.length;
  }

  get rank() {
    return this.order || 999;
  }

  get heros() {
    return heros[this.slug];
  }

  get subs() {
    return subs[this.slug];
  }
}

import Controller from '@ember/controller';
import EmberObject from '@ember/object';

const variations =
  '@800x800.jpg,@1000x1000.webp,@50x50.webp,@2200x2200.jpg,@2400x2400.webp,@1200x1200.jpg,@200x200.jpg,@2400x2400.jpg,@1400x1400.webp,@50x50.jpg,@600x600.webp,@2000x2000.jpg,@1800x1800.jpg,@600x600.jpg,@100x100.jpg,@1600x1600.jpg,@1600x1600.webp,@2200x2200.webp,@1400x1400.jpg,@400x400.webp,@2000x2000.webp,@400x400.jpg,@100x100.webp,@2400x2400.png,@1000x1000.jpg,@800x800.webp,@1200x1200.webp,@1800x1800.webp,@200x200.webp';

// const heros = {
//   'soldering-fluxes': [
//     'images/products/IF-2005M/IF-2005M-10L-angle',
//     'images/products/Pacific-2009M/Pacific-2009M-bottles-3',
//     'images/products/SelectIF-2040/SelectIF-2040-10L-angle',
//     'images/products/IF-2005M-025/IF-2005M-025-200L'
//   ],
//   'solder-pastes': [
//     'images/products/LMPA-Q6/LMPA-Q6-500g',
//     'images/products/LP-5720/LP-5720-SnAgCu-syringes',
//     'images/products/micro-dIFe-7/micro-dIFe-7-2',
//     'images/products/LMPA-Q6/LMPA-Q6-demo-5-cutout'
//   ],
//   'solder-wires': [
//     'images/products/Laser-25/Laser-25-SnCu-500g',
//     'images/products/NH-1/NH-1-SnAgCu-100g',
//     'images/products/NH-1/NH-1-SnCu-500g-cutout',
//     'images/products/Aquasol-4018/Aquasol-4018-solder-wire-SnPb-500g'
//   ],
//   'solder-alloys': [
//     'images/products/Solder-Bars/Solder-Bars-15',
//     'images/products/Plain-Solder-Wires/Plain-Solder-Wire-SnPb-4kg',
//     'images/products/Solder-Pellets/Solder-Pellets-3',
//     'images/products/Solder-Stones/Solder-Stones-3'
//   ],
//   auxiliaries: [
//     'images/products/Purgel/Purgel-2',
//     'images/products/Tip-Tinner/Tip-Tinner-4',
//     'images/products/LMPA-Oil/LMPA-Oil',
//     'images/products/Flux-Pen/Flux-Pen-set-2'
//   ],
//   'fluxing-systems': [
//     'images/products/ICSF-Select/ICSF-Select-5-closeup',
//     'images/products/ICSF-Select/ICSF-Select-1',
//     'images/products/ICSF-Select/ICSF-Select-19-closeup',
//     'images/products/ICSF-Select/ICSF-Select-8-closeup'
//   ]
// };

export default class DocumentsController extends Controller {
  get families() {
    return [
      {
        namePlural: 'Soldering fluxes',
        slug: 'soldering-fluxes',
        images: [
          EmberObject.create({
            path: 'images/products/IF-2005M/IF-2005M-10L-angle',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path: 'images/products/Pacific-2009M/Pacific-2009M-bottles-3',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path: 'images/products/SelectIF-2040/SelectIF-2040-10L-angle',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path: 'images/products/IF-2005M-025/IF-2005M-025-200L',
            alt: '',
            caption: '',
            variations
          })
        ]
      },
      {
        namePlural: 'Solder pastes',
        slug: 'solder-pastes',
        images: [
          EmberObject.create({
            path: 'images/products/LMPA-Q6/LMPA-Q6-500g',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path: 'images/products/Pacific-2009M/Pacific-2009M-bottles-3',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path: 'images/products/micro-dIFe-7/micro-dIFe-7-2',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path: 'images/products/LMPA-Q6/LMPA-Q6-demo-5-cutout',
            alt: '',
            caption: '',
            variations
          })
        ]
      },
      {
        namePlural: 'Solder wires',
        slug: 'solder-wires',
        images: [
          EmberObject.create({
            path: 'images/products/Laser-25/Laser-25-SnCu-500g',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path: 'images/products/NH-1/NH-1-SnAgCu-100g',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path: 'images/products/NH-1/NH-1-SnCu-500g-cutout',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path:
              'images/products/Aquasol-4018/Aquasol-4018-solder-wire-SnPb-500g',
            alt: '',
            caption: '',
            variations
          })
        ]
      },
      {
        namePlural: 'Solder alloys',
        slug: 'solder-alloys',
        images: [
          EmberObject.create({
            path: 'images/products/Solder-Bars/Solder-Bars-15',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path:
              'images/products/Plain-Solder-Wires/Plain-Solder-Wire-SnPb-4kg',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path: 'images/products/Solder-Pellets/Solder-Pellets-3',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path: 'images/products/Solder-Stones/Solder-Stones-3',
            alt: '',
            caption: '',
            variations
          })
        ]
      },
      {
        namePlural: 'Auxiliaries',
        slug: 'auxiliaries',
        images: [
          EmberObject.create({
            path: 'images/products/Purgel/Purgel-2',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path: 'images/products/Tip-Tinner/Tip-Tinner-4',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path: 'images/products/LMPA-Oil/LMPA-Oil',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path: 'images/products/Flux-Pen/Flux-Pen-set-2',
            alt: '',
            caption: '',
            variations
          })
        ]
      },
      {
        namePlural: 'Fluxing systems',
        slug: 'fluxing-systems',
        images: [
          EmberObject.create({
            path: 'images/products/ICSF-Select/ICSF-Select-5-closeup',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path: 'images/products/ICSF-Select/ICSF-Select-1',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path: 'images/products/ICSF-Select/ICSF-Select-19-closeup',
            alt: '',
            caption: '',
            variations
          }),
          EmberObject.create({
            path: 'images/products/ICSF-Select/ICSF-Select-8-closeup',
            alt: '',
            caption: '',
            variations
          })
        ]
      }
    ];
  }
}

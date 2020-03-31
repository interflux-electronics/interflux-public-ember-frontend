import Page from '../../component';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';

export default Page.extend({
  elementId: 'products-family',

  isFlux: equal('family.slug', 'soldering-fluxes'),
  isPaste: equal('family.slug', 'solder-pastes'),
  isWire: equal('family.slug', 'solder-wires'),

  waterBasedFluxes: computed(function() {
    return this.products.filter(p => p.hasFeature('water-based'));
  }),
  alcoholBasedFluxes: computed(function() {
    return this.products.filter(p => p.hasFeature('alcohol-based'));
  }),
  rosinBasedFluxes: computed(function() {
    return this.products.filter(p => p.hasFeature('rosin-based'));
  }),
  leadBasedWires: computed(function() {
    return this.products.filter(p => p.hasFeature('lead-based'));
  }),
  leadFreeWires: computed(function() {
    return this.products.filter(p => p.hasFeature('lead-free'));
  })
});

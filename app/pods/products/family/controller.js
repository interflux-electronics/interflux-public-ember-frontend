import Controller from '@ember/controller';

export default class ProductsFamilyController extends Controller {
  get groupBy() {
    const id = this.model.family.id;

    if (id === 'soldering-fluxes' || id === 'auxiliaries') {
      return 'subFamily';
    }

    if (
      id === 'solder-pastes' ||
      id === 'solder-wires' ||
      id === 'solder-alloys'
    ) {
      return 'alloy';
    }

    if (id === 'auxiliaries') {
      return 'none';
    }

    return null;
  }
}

import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ProductsFamilyController extends Controller {
  @tracked title;
  @tracked products;
  @tracked family;

  get groupBy() {
    const id = this.family.get('id');

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

    if (id === 'fluxing-systems') {
      return 'none';
    }

    return null;
  }
}

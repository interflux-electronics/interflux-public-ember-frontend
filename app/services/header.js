import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class HeaderService extends Service {
  @tracked title = 'Interflux';
  @tracked crumbs = [];
  @tracked backRoute = 'home.index';
  @tracked backModel = 'OSPI-3311M';

  get showLogo() {
    return ['index', 'home'].includes(this.backRoute);
  }
}

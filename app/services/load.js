import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class LoadService extends Service {
  @tracked show = false;
  @tracked route;
}

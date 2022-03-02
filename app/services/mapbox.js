import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MapboxService extends Service {
  @tracked map;
}

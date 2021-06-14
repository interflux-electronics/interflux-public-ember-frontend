import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class HeaderService extends Service {
  @tracked isFastBoot = false;
}

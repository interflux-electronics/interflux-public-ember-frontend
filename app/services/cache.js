import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CacheService extends Service {
  @tracked payloads = {};

  store(payload, key) {
    this.payloads[key] = payload;
  }

  retrieve(key) {
    return this.payloads[key];
  }
}

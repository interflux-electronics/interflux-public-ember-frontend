import Service from '@ember/service';

export default class CacheService extends Service {
  paths = [];

  hasPath(path) {
    return this.paths.includes(path);
  }

  addPath(path) {
    this.paths.push(path);
  }

  hasProductsIndex = false;
}

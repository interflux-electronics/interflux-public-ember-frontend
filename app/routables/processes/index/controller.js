import Controller from '@ember/controller';

export default class ProcessesIndexController extends Controller {
  get processes() {
    return this.model.processes.sortBy('order');
  }
}

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ProcessesIndexController extends Controller {
  @service media;

  get processes() {
    return this.model.processes.sortBy('order');
  }
}

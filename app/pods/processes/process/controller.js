import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ProcessesProcessController extends Controller {
  @service media;

  get processes() {
    return this.model.processes.filterBy('hasPage', true);
  }
}

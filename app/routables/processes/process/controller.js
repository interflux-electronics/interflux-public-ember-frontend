import Controller from '@ember/controller';

export default class ProcessesProcessController extends Controller {
  get processes() {
    return this.model.processes.filterBy('hasPage', true);
  }
}

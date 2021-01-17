import Route from '@ember/routing/route';

export default class ProcessesIndexRoute extends Route {
  model() {
    return {
      processes: this.modelFor('processes').processes
    };
  }
}

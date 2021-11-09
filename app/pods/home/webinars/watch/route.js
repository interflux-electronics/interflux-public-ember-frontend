import ModalRoute from 'interflux/pods/components/modal/route';

export default class WebinarsWatchRoute extends ModalRoute {
  model(params) {
    return this.store.peekRecord('webinar', params.webinar);
  }
}

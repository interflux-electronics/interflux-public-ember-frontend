import BaseRoute from 'interflux/pods/base/route';

export default class DocumentsLoadingRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'documents-loading',
      title: 'Loading ...'
    });
  }
}

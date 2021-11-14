import BaseRoute from 'interflux/pods/base/route';

export default class DocumentsErrorRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'documents-error',
      title: 'Whoops'
    });
  }
}

import BaseRoute from 'interflux/pods/base/route';

export default class DocumentsErrorRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.error);
    this.page.update({
      id: 'documents-error',
      title: 'Whoops',
      showError: true
    });
  }
}

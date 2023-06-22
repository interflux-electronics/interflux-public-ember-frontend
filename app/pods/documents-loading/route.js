import BaseRoute from 'interflux/pods/base/route';

export default class DocumentsLoadingRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.documents);
    this.page.update({
      id: 'documents-loading',
      title: 'Loading ...'
    });
  }
}

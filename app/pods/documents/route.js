import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class DocumentsRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.documents);
    this.page.update({
      id: 'documents',
      title: 'Documents',
      backRoute: 'index',
      theme: 'blue overlap'
    });
  }

  model() {
    if (this.cachedPayload) {
      return this.cachedPayload;
    }

    const payload = {
      documents: this.store.findAll('document'),
      products: this.store.findAll('product')
    };

    return this.serverSideRendered ? payload : hash(payload);
  }
}

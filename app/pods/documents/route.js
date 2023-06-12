import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class DocumentsRoute extends BaseRoute {
  activate() {
    super.activate();

    this.headData.reset();
    this.headData.setProperties({
      title: 'Documents – Interflux',
      description:
        'Technical data sheets (TD), medical & safety data sheets (SDS), REACH, guides, declarations and quality certificates.',
      canonicalPath: 'documents'
    });
    this.page.update({
      id: 'documents',
      title: 'Documents',
      backRoute: 'index'
    });
  }

  model() {
    if (this.cachedPayload) {
      return this.cachedPayload;
    }

    const payload = {
      documents: this.store.findAll('document'),
      categories: this.store.findAll('documentCategory')
    };

    return this.serverSideRendered ? payload : hash(payload);
  }
}

import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class DocumentsRoute extends BaseRoute {
  beforeModel() {
    this.headData.reset();
    this.headData.setProperties({
      title: 'Documents – Interflux',
      description:
        'Technical data sheets (TD), medical & safety data sheets (SDS), REACH, guides, declarations and quality certificates.',
      canonicalPath: 'documents'
    });
  }

  model() {
    return hash({
      documents: this.store.findAll('document'),
      categories: this.store.findAll('documentCategory')
    });
  }
}

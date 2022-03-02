import BaseRoute from 'interflux/pods/base/route';
import { hash } from 'rsvp';

export default class DocumentsRoute extends BaseRoute {
  activate() {
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
      backRoute: 'home'
    });
  }

  model() {
    return hash({
      documents: this.cache.documents || this.store.findAll('document'),
      categories:
        this.cache.categories || this.store.findAll('documentCategory')
      // error: new Promise((resolve, reject) => setTimeout(reject, 1 * 1000))
      // delay: new Promise((resolve) => setTimeout(resolve, 3 * 1000))
    });
  }

  afterModel(model) {
    this.cache.documents = model.documents;
    this.cache.categories = model.categories;
  }
}

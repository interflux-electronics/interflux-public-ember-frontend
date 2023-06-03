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
      backRoute: 'index'
    });
  }

  model() {
    const shoebox = this.fastboot.shoebox.retrieve(this.routeName);
    const prerenderSuccess = shoebox?.success;

    if (this.fastboot.isFastBoot) {
      console.warn('prerenderSuccess', prerenderSuccess);
    }

    const promises = {
      documents: this.store.findAll('document'),
      categories: this.store.findAll('documentCategory')
    };

    return prerenderSuccess ? promises : hash(promises);
  }

  afterModel(model) {
    this.cache.documents = model.documents;
    this.cache.categories = model.categories;

    if (this.fastboot.isFastBoot && model.documents && model.categories) {
      console.warn('SHOEBOX PUT');
      this.fastboot.shoebox.put(this.routeName, { success: true });
    }
  }
}

import BaseRoute from 'interflux/pods/base/route';

export default class ContactLoadingRoute extends BaseRoute {
  activate() {
    this.headData.reset();
    this.headData.setProperties({
      title: 'Contact – Interflux',
      description:
        'Find us worldwide: Belgium, Germany, China, Singapore, Australia, Mexico, Poland, Russia, Sweden, ...',
      canonicalPath: 'contact'
    });
    this.page.update({
      id: 'contact',
      title: 'Contact',
      backRoute: 'home',
      theme: 'blue overlap'
    });
  }
}

import BaseRoute from 'interflux/pods/base/route';

export default class LanguageErrorRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'application-error',
      title: 'Whoops',
      showError: true
    });
  }
}

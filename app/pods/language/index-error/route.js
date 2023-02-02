import BaseRoute from 'interflux/pods/base/route';

export default class LanguageErrorRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'homepage-error',
      title: 'Whoops',
      showError: true
    });
  }
}

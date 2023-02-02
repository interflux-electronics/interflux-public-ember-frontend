import BaseRoute from 'interflux/pods/base/route';

export default class LanguageLoadingRoute extends BaseRoute {
  activate() {
    this.page.update({
      id: 'language-loading',
      title: 'Loading ...',
      showLoading: true
    });
  }
}

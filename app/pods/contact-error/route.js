import BaseRoute from 'interflux/pods/base/route';

export default class LanguageErrorRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.error);
    this.page.update({
      id: 'language',
      title: 'Whoops',
      showError: true
    });
  }
}

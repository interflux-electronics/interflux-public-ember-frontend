import BaseRoute from 'interflux/pods/base/route';

export default class CompanyRoute extends BaseRoute {
  activate() {
    super.activate();
    this.headData.update(this.seo.company);
    this.page.update({
      id: 'company',
      title: 'Company',
      backRoute: 'index'
    });
  }
}

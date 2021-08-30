import BaseRoute from 'interflux/pods/base/route';

export default class CompanyRoute extends BaseRoute {
  beforeModel() {
    this.headData.reset();
    this.headData.setProperties({
      title: 'Company – Interflux',
      description:
        'Pioneers in soldering chemistry. 41+ years of experience. ISO 9001 certified. Responsible and eco-friendly. Worldwide support.',
      canonicalPath: 'company'
    });
  }
}

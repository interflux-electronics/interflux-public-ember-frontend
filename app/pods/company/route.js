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

  model() {
    return {
      video: this.store.createRecord('video', {
        title: "Interflux Electronics's journey towards sustainability",
        path: 'videos/our-journey-towards-sustanability/our-journey-towards-sustanability',
        variations:
          '@1920x1080.mp4,@1920x1080.webm,@1920x1080.ogg,@800x449.jpg,@800x449.jpg'
      })
    };
  }
}

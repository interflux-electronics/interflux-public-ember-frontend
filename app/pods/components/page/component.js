import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';

export default class PageComponent extends Component {
  @service page;
  @service modal;
  @service media;

  get id() {
    return this.page.id || this.args.id;
  }

  get title() {
    return this.page.title || this.args.title;
  }

  get backRoute() {
    return this.page.backRoute || this.args.backRoute;
  }

  get backModel() {
    return this.page.backModel || this.args.backModel;
  }

  get pageClasses() {
    return this.modal.showModal ? 'prevent-scroll' : null;
  }

  get mainClasses() {
    return [this.page.mainClasses, this.args.class]
      .filter((x) => !!x)
      .join(' ');
  }

  get pageStyle() {
    return this.modal.showModal
      ? htmlSafe(`top: -${this.modal.pageScrollY}px`)
      : null;
  }

  get showMobileHeader() {
    return this.media.isMobileTablet && !this.args.loading;
  }

  get showDesktopHeader() {
    return this.media.isDesktopWidescreen && !this.args.loading;
  }

  get showFooter() {
    return !this.args.loading;
  }

  @action
  onPageClick() {
    this.page.shownHeaderMenu = null; // To close open menus in the <header>
  }
}

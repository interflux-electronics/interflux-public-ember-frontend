import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';

export default class PageComponent extends Component {
  @service modal;
  @service media;

  get pageClasses() {
    return this.modal.showModal ? 'no-scroll' : null;
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
}

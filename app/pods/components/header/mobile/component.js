import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HeaderMobileComponent extends Component {
  @service header;
  @service media;
  @service page;
  @service modal;
  @service window;
  @service scroll;

  get classes() {
    return [
      this.menuIsOpen ? 'open' : 'closed',
      this.nearTop ? 'near-top' : 'not-near-top',
      this.scroll.goingDown ? 'scrolling-down' : 'scrolling-up',
      this.args.backRoute ? 'has-back-button' : 'no-back-button',
      this.page.theme ? `${this.page.theme}-theme` : 'no-theme'
    ].join(' ');
  }

  @tracked menuIsOpen = false;

  @action toggleMenu() {
    if (this.menuIsOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.menuIsOpen = true;
    this.modal.setProperties({
      showModal: true,
      pageScrollY: window.pageYOffset || document.documentElement.scrollTop
    });
    window.scrollTo(0, 0);
  }

  @action async closeMenu() {
    this.menuIsOpen = false;
    const { pageScrollY } = this.modal;
    this.modal.setProperties({
      showModal: false,
      pageScrollY: 0
    });
    window.scrollTo(0, pageScrollY);
  }

  get nearTop() {
    return this.scroll.currentY < 100;
  }
}

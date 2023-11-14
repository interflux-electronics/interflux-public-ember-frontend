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
      this.expanded ? 'expanded' : 'collapsed',
      this.nearTop ? 'near-top' : 'not-near-top',
      this.scroll.goingDown ? 'scrolling-down' : 'scrolling-up',
      this.page.theme ? `${this.page.theme}` : 'no-theme',
      this.showBackButton ? 'show-back-button' : 'no-back-button',
      `${this.view}-view`
    ].join(' ');
  }

  @tracked view = 'hamburger'; // hamburger, main, products, processes

  @action
  setView(view, event) {
    this.view = view;

    if (view === 'main') {
      this.modal.open();
    }

    if (view === 'hamburger') {
      // Reset the height on the <nav>.
      this.nav.style.height = null;

      // If the button clicked was the hamburger, then we want the page below
      // the modal to restor back to position it had before the modal opened.
      // All other buttons are considered route changes for which we do not wish
      // to restore the scroll. Instead we reset it to zero.
      const restoreScroll = event.currentTarget.id === 'hamburger';

      this.modal.close(restoreScroll);

      return;
    }

    const topHeight = this.top.offsetHeight;
    const menuHeight = this.mid.querySelector(`#${view}.menu`).offsetHeight;
    const navHeight = Math.max(topHeight + menuHeight, window.innerHeight);

    // Set the height of <nav> to make the modal content visible.
    this.nav.style.height = `${navHeight}px`;
  }

  get expanded() {
    return this.view !== 'hamburger';
  }

  get showBackButton() {
    return this.view === 'products' || this.view === 'processes';
  }

  get nearTop() {
    return this.scroll.currentY < 100;
  }

  @tracked nav;
  @tracked top;
  @tracked mid;

  @action
  onInsert(element) {
    this.nav = element;
    this.top = element.querySelector('#top');
    this.mid = element.querySelector('#mid');
  }

  get title() {
    if (this.view === 'Products') {
      return 'products';
    }

    if (this.view === 'Processes') {
      return 'processes';
    }

    return this.args.title;
  }
}

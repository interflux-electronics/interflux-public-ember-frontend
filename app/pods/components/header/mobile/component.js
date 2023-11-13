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
  setView(view) {
    this.view = view;

    if (view === 'main') {
      this.modal.open();
    }

    if (view === 'hamburger') {
      this.modal.close();

      // Reset the height on the <nav>.
      this.nav.style.height = null;

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

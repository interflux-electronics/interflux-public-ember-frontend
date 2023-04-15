import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class HeaderDesktopComponent extends Component {
  @service page;

  get showMenu() {
    return this.page.shownHeaderMenu;
  }

  set showMenu(value) {
    this.page.shownHeaderMenu = value;
  }

  get showProducts() {
    return this.showMenu === 'products';
  }

  get showProcesses() {
    return this.showMenu === 'processes';
  }

  get showLanguages() {
    return this.showMenu === 'languages';
  }

  // Open the menu below the clicked <button>.
  @action toggleMenu(event) {
    event.stopPropagation(); // Prevent the <Page> component from closing the menu.

    const button = event.currentTarget;
    const id = button.closest('li').id;

    // In case this menu is already open, then close it.
    if (this.showMenu === id) {
      return (this.showMenu = null);
    }

    this.showMenu = id;
  }

  @action expandButton(event) {
    const li = event.currentTarget.closest('li');
    const clip = li.querySelector('.clip');
    const span = clip.querySelector('span');
    clip.style = `width: ${span.offsetWidth}px`;
  }

  @action collapseButton(event) {
    const li = event.currentTarget.closest('li');
    const clip = li.querySelector('.clip');
    clip.style = `width: 0px`;
    this.showMenu = null;
  }

  @action closeMenu() {
    this.showMenu = null;
  }
}

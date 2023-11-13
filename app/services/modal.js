import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ModalService extends Service {
  @service window;

  // Set to true to overlay a page with a modal and prevent the page below from scrolling.
  @tracked showModal = false;

  // The Y scroll position of page right before the modal was invoked.
  // We use this to scroll back to the original position after the modal closes.
  @tracked pageScrollY = 0;

  // Opens the modal.
  // Remember the scroll position of the page which will soon be overlayed by
  // the modal. Once the modal closes, we need to restore that scroll. This
  // technique is necessary to have scrollable modals. When the modal is open,
  // the modal content becomse position:relative and the page behind it becomes
  // position:fixed (counter intuitive).
  open() {
    this.showModal = true;
    this.pageScrollY = window.scrollY || document.documentElement.scrollTop;

    window.scrollTo(0, 0);
  }

  // Closes the modal.
  async close() {
    // Remember.
    const { pageScrollY } = this;

    // Reset
    this.showModal = false;
    this.pageScrollY = 0;

    // Delay so that the Ember and CSS can take effect.
    await this.window.delay(1);

    // Scroll the page back to where it was before modal opened.
    window.scrollTo(0, pageScrollY);
  }
}

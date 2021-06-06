import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ModalService extends Service {
  // Set to true to overlay a page with a modal and prevent the page below from scrolling.
  @tracked showModal = false;

  // The Y scroll position of page right before the modal was invoked.
  // We use this to scroll back to the original position after the modal closes.
  @tracked pageScrollY = 0;
}

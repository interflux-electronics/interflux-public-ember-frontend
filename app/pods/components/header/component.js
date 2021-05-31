import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class HeaderComponent extends Component {
  @service header;
  @service media;

  openMenu(event) {
    event.currentTarget.classList.add('close');
    console.debug('open menu');
  }
}

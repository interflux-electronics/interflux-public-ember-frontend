import Component from '@glimmer/component';

export default class FooterComponent extends Component {
  get year() {
    return new Date().getFullYear();
  }
}

import Component from '@glimmer/component';

export default class HeaderHeroComponent extends Component {
  get theme() {
    return ['header-hero', this.args.theme].join(' ');
  }
}

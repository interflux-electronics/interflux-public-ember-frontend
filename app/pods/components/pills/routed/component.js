import Component from '@glimmer/component';

export default class PillsComponent extends Component {
  // @arg options
  // @arg selected
  // @arg resetRoute

  get label() {
    return this.args.label || 'label';
  }

  get classes() {
    return ['pills', this.layout].join(' ');
  }

  get layout() {
    return ['horizontal', 'vertical'].includes(this.args.layout)
      ? this.args.layout
      : 'vertical';
  }
}

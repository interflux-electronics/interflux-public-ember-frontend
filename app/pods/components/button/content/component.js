import Component from '@glimmer/component';

// TODO: convert to Typescript
//
// interface <Args> {
//   text?: string;
//   icon?: string;
// }

export default class ButtonContentComponent extends Component {
  get iconIsValid() {
    const valid = [
      'arrow-down',
      'arrow-left',
      'arrow-right',
      'arrow-up',
      'calendar-check',
      'chevron-down',
      'chevron-left',
      'close',
      'cloud-download',
      'cross',
      'document',
      'email',
      'expand',
      'flask',
      'hamburger',
      'lightbulb',
      'microchip',
      'people',
      'play',
      'podcast',
      'share',
      'star',
      'street-view',
      'truck',
      'user',
      'search'
    ].includes(this.args.icon);

    if (!valid) {
      console.warn(
        `<Button @icon="${this.args.icon}"> cannot be rendered. Invalid icon.`
      );
    }

    return valid;
  }
}

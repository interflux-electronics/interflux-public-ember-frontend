import Component from '@glimmer/component';

export default class RouteErrorMessage extends Component {
  get showBackButton() {
    console.log(this.args.hideBackButton);
    return this.args.hideBackButton ? false : true;
  }

  get backRoute() {
    return this.args.backRoute || 'home';
  }

  get backLabel() {
    return this.args.backLabel || 'Return to homepage';
  }
}

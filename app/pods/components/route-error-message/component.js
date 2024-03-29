import Component from '@glimmer/component';

export default class RouteErrorMessage extends Component {
  get showBackButton() {
    return this.args.hideBackButton ? false : true;
  }

  get backRoute() {
    return this.args.backRoute || 'index';
  }

  get backLabel() {
    return this.args.backLabel || 'Return to homepage';
  }
}

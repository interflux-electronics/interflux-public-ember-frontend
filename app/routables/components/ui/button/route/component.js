import LinkComponent from '@ember/routing/link-component';
import { PropTypes } from 'ember-prop-types';

const { string, object } = PropTypes;

export default LinkComponent.reopen({
  classNames: ['button-route', 'button-base'],

  propTypes: {
    route: string.isRequired,
    // model: string,
    // models: object,
    text: string,
    icon: string
  }
});

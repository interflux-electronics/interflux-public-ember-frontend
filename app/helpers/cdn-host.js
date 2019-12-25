import { helper } from '@ember/component/helper';
import config from 'ember-get-config';

export default helper(function env() {
  return config.buildConfig.cdnHost;
});

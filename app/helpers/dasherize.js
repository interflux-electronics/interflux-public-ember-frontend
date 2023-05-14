import { helper } from '@ember/component/helper';
import { dasherize } from '@ember/string';

export function capitalise(params) {
  return dasherize(params[0]);
}

export default helper(capitalise);

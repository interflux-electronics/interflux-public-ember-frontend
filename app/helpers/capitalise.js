import { helper } from '@ember/component/helper';
import { capitalize } from '@ember/string';

export function capitalise(params) {
  const phrase = params[0];

  if (!phrase) {
    console.warn('cannot capitalise undefined');
    return '';
  }

  const words = phrase.split(' ');
  const arr = words.map((word) => capitalize(word));
  const str = arr.join(' ');
  return str;
}

export default helper(capitalise);

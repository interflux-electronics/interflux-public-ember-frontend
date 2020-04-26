import { helper } from '@ember/component/helper';
import { capitalize } from '@ember/string';

export function capitalizeWords(params) {
  const phrase = params[0];
  const words = phrase.split(' ');
  const arr = words.map(word => capitalize(word));
  const str = arr.join(' ');
  return str;
}

export default helper(capitalizeWords);

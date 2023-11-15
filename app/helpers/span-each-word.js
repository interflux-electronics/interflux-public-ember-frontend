import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export function spanEachWord(params) {
  const phrase = params[0];

  if (!phrase) {
    console.warn('no phrase');
    return;
  }

  const words = phrase.split(' ');

  const html = `<span>${words.join('</span><span>&nbsp;</span><span>')}</span>`;

  return htmlSafe(html);
}

export default helper(spanEachWord);

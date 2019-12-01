import { helper } from '@ember/component/helper';

export function spanEachWord(params) {
  const phrase = params[0];
  const words = phrase.split(' ');
  let html =
    '<span>' +
    words.join('</span><span class="blank"> </span><span>') +
    '</span>';
  return html;
}

export default helper(spanEachWord);

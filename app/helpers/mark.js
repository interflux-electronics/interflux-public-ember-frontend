import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

// <p>{{mark this.search.value label}}</p>

export default helper(function mark(params) {
  let phrase = params[1];

  if (!phrase) {
    return '';
  }

  let wordToMark = params[0];

  if (!wordToMark) {
    return phrase;
  }

  // Akward things happen when search ends with a space
  wordToMark = wordToMark.trim();

  if (typeof phrase === 'object' && phrase.string) {
    phrase = phrase.string;
  }

  const regex = new RegExp(wordToMark, 'gi');

  phrase = phrase.replace(regex, '<mark>$&</mark>');

  return htmlSafe(phrase);
});

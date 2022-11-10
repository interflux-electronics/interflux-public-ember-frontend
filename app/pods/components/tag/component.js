import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class TagComponent extends Component {
  get textWithWordSpans() {
    const phrase = this.args.text;
    const words = phrase.split(' ');

    const html = `<nobr><span class="word">${words.join(
      '</span><span class="space">&nbsp;</span></nobr><nobr><span class="word">'
    )}</span></nobr>`;

    return htmlSafe(html);
  }
}

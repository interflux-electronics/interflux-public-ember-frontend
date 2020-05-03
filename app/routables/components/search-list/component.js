// HACK:
// From the moment users enter a character in the search field, they expect
// something to happen immediately. If we use Ember template logic for this,
// the rendering will be sluggish, not ideal. To speed up we use good old
// fashioned vanilla JS for searching, marking, hiding and showing <li>s.
//
// Assumptions:
// 1. The {{yield}} contains a <ul> with <li>
// 2. The <li> has elements with the attribute [data-search="me"]
// 3. Those [data-search="me"] should only have text inside, no elements.
//
// Usage:
// <SearchList>
//   <ul>
//     {{#each @items as |item|}}
//       <li>
//         <p data-search="me">{{item.name}}</p>
//       </li>
//     {{/each}}
//   </ul>
// </SearchList>
//
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SearchListComponent extends Component {
  @tracked element;
  @tracked count = 0;
  @tracked max = 0;

  @action
  onInsert(element) {
    this.element = element;
    this.max = this.element.querySelectorAll('li').length;
    this.count = this.max;
  }

  @action
  filter(query) {
    const regex = new RegExp(`(${query})`, 'ig');
    let count = 0;

    this.element.querySelectorAll('[data-search="me"]').forEach(el => {
      if (!query || !regex.test(el.textContent)) {
        el.innerHTML = el.textContent;
      } else {
        el.innerHTML = el.textContent.replace(regex, '<mark>$1</mark>');
        count++;
      }
    });

    this.element.querySelectorAll('li').forEach(li => {
      const n = li.querySelectorAll('mark').length;
      if (n > 0) {
        li.removeAttribute('style'); // show
      } else {
        li.style.display = 'none'; // hide
      }
    });

    this.count = query ? count : this.max;
  }
}

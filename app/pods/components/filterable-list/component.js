//
// This component will {{yield}} whatever HTML you pass in and when @query is updated, it will
// use vanilla JS to look for all the HTML wrappers which have the [data-search-me] attribute on
// them. If those "search-me" wrappers contain the keywords than their closest <li> parent will be
// marked as "has-a-match" and remain visible to the user. Next we highlight in yellow with <mark>
// where in the text the query occurs.
//
// NOTE: We could use Ember for this, but performance is faster with vanilla JS.
//
// Assumptions:
// 1. The {{yield}} contains a <ul> with <li>
// 2. The <li> has wrappers with the attribute [data-search-me]
// 3. Those [data-search-me] should only have text inside, no wrappers.
//
// Usage:
// <FilterableList @query={{this.query}}>
//   <ul>
//     {{#each @items as |item|}}
//       <li>
//         <p data-search-me>{{item.name}}</p>
//       </li>
//     {{/each}}
//   </ul>
// </FilterableList>
//
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FilterableListComponent extends Component {
  @tracked wrapper;
  @tracked count = 0;
  @tracked max = 0;

  @action
  onInsert(wrapper) {
    this.wrapper = wrapper;
    this.max = this.wrapper.querySelectorAll('li').length;
    this.count = this.max;
  }

  @action
  onFilter(event) {
    const { query } = event.detail;

    // If no user query, clear all <mark> and show all <li>
    if (!query) {
      this.wrapper.querySelectorAll('li[data-search-parent]').forEach((li) => {
        li.removeAttribute('style');
      });
      this.wrapper.querySelectorAll('[data-search-me').forEach((el) => {
        el.innerHTML = el.textContent;
      });

      return;
    }

    const regex = new RegExp(`(${query})`, 'ig');
    let count = 0;

    // Mark all text that matches the query with <mark>
    this.wrapper.querySelectorAll('[data-search-me]').forEach((el) => {
      if (!regex.test(el.textContent)) {
        el.innerHTML = el.textContent;
      } else {
        el.innerHTML = el.textContent.replace(regex, '<mark>$1</mark>');
        count++;
      }
    });

    // Hide all <li> that do not have <mark>
    this.wrapper.querySelectorAll('li[data-search-parent]').forEach((li) => {
      const n = li.querySelectorAll('mark').length;
      if (n > 0) {
        li.removeAttribute('style'); // show
      } else {
        li.style.display = 'none'; // hide
      }
    });

    // Updat the counters
    this.count = query ? count : this.max;

    if (this.args.updateCounter) {
      this.args.updateCounter(count);
    }
  }
}

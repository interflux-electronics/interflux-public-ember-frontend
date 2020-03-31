import FormFieldComponent from '../form-field/component';
import EmberObject, { computed } from '@ember/object';
import { and, not } from '@ember/object/computed';
import { htmlSafe } from '@ember/template';

export default FormFieldComponent.extend({
  classNames: ['form-search', 'form-input'],
  classNameBindings: ['showDropdown:show-dropdown:hide-dropdown'],
  attributeBindings: ['disabled'],

  // Passed in
  label: undefined,
  placeholder: undefined,
  onSelect: undefined,
  searchKey: undefined,
  sortKey: undefined,
  sortOrder: undefined, // asc or desc

  // The value as shown in the input
  value: undefined,

  // The passed-in array of objects or records which the user will be choosing from
  options: undefined,

  // The options filtered by the user's search query and sorted
  results: undefined,

  // Whether the passed in array of options has at least 1 item.
  hasOptions: computed('options', function() {
    return this.options && this.options.length;
  }),

  // In case no options were passed in, then disabled the form field.
  // TODO: Create disabled state
  disabled: not('hasOptions'),

  // Whether user is currently focused on the <input>
  hasFocus: false,

  // Whether user typed at least 1 letter in the <input>
  hasQuery: false,

  // Show the dropdown if <input> has focus and at least 1 letter
  showDropdown: and('hasFocus', 'hasQuery'),

  // Which item in the dropdown to highlight
  highlightIndex: 0,

  actions: {
    onFocus() {
      this.set('hasFocus', true);
    },

    onBlur() {
      // TODO: Impedes onclickItem closure...
      // TODO: Close dropdown if clicked outside of it
      // this.set('hasFocus', false);
    },

    onInput(query) {
      this.showResultsFor(query);

      // When someone types, remove the selected option
      this.onSelect(undefined);
    },

    onKeyUp(event) {
      this.set('hasFocus', true);

      const pressedDown = event.key === 'ArrowDown';
      const pressedUp = event.key === 'ArrowUp';
      const pressedEnter = event.key === 'Enter';

      if (pressedDown) {
        this.moveSelectionDown();
      }

      if (pressedUp) {
        this.moveSelectionUp();
      }

      if (pressedEnter) {
        this.selectHighlighted();
        this.set('hasFocus', false);
      }
    },

    onClickItem(result) {
      this.select(result);
      this.set('hasFocus', false);
    },

    onMouseOverItem(index) {
      this.set('highlightIndex', index);
    }
  },

  showResultsFor(query) {
    // Find and set results
    const results = this.resultsFor(query);
    this.set('results', results);

    // Set flag
    const hasQuery = query && query.length;
    this.set('hasQuery', hasQuery);

    // Reset the highligh index so the first item is selected after each key stroke.
    this.set('highlightIndex', 0);

    // Set the value of the <input> so Glimmer knows when to rerender we set
    // this.set('value', selected);
    this.set('value', query);
  },

  moveSelectionDown() {
    if (!this.results) {
      return;
    }
    const max = this.results.length;
    let i = this.highlightIndex + 1;
    i = i >= max ? 0 : i;
    this.set('highlightIndex', i);
  },

  moveSelectionUp() {
    if (!this.results) {
      return;
    }
    const max = this.results.length;
    let i = this.highlightIndex - 1;
    i = i < 0 ? max - 1 : i;
    this.set('highlightIndex', i);
  },

  selectHighlighted() {
    const i = this.highlightIndex;
    const highlightedResult = this.results[i];
    this.select(highlightedResult);
  },

  select(result) {
    this.onSelect(result.option);
    this.set('value', result.string);
    this.showResultsFor(result.string);
  },

  resultsFor(query) {
    if (!this.hasOptions || !this.hasQuery) {
      return;
    }

    // 1. Filter the results
    let arr = [];
    this.options.forEach(option => {
      const string = option[this.searchKey];
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'gi');
      const split1 = string.split(regex);
      const split2 = string.match(regex);
      const isMatch = split1 && split1.length > 1;
      if (isMatch) {
        let html = '';
        for (let i = 0; i < split1.length; i++) {
          html += split1[i];
          html += split2[i] ? `<strong>${split2[i]}</strong>` : '';
          html = htmlSafe(html);
        }
        const result = EmberObject.create({ option, string, html });
        arr.push(result);
      }
    });

    // 2. Sort the results
    if (this.sortKey) {
      arr = arr.sortBy(`option.${this.sortKey}`);
    }
    if (this.sortOrder === 'desc') {
      arr = arr.reverse();
    }

    return arr;
  }
});

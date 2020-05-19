import { helper } from '@ember/component/helper';

// Inspired from:
// https://stackoverflow.com/questions/23199459/replace-all-content-between-characters-with-javascript

export default helper(function markdown(params) {
  const text = params[0];
  if (!text) {
    return text;
  }
  // Wrap all **bolded** words with <strong> tags
  let html = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return html;
});

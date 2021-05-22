import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export default helper(function toDefinitionList(params) {
  const string = params[0];

  if (!string) {
    return htmlSafe('<dl></dl>');
  }

  const lines = string
    .replace(/\r?\n\*\s/g, ';;;')
    .split(/\r?\n/)
    .filter((line) => !!line && line.includes(':'));

  let html = '';

  lines.forEach((line) => {
    let key = line.split(':')[0].trim();
    let value = line.split(':')[1].trim();

    if (value.includes(';;;')) {
      let list = '';
      value
        .split(/;;;/g)
        .filter((x) => !!x)
        .forEach((li) => {
          list += `<li>${li}</li>`;
        });
      value = `<ul>${list}</ul>`;
    }

    html = html + `<dt>${key}</dt><dd>${value}</dd>`;
  });

  html = `<dl>${html}</dl>`;

  return htmlSafe(html);
});

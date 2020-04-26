import { helper } from '@ember/component/helper';

export default helper(function markdown(str) {
  // const html = str.split('**').reduce((acc, value, i) => {
  //   return acc + value + '<strong>';
  // });

  return str;
});

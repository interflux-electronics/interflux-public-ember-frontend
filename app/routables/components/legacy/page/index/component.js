import Page from '../component';

export default Page.extend({
  elementId: 'index-page',

  *transition() {
    console.debug('index-page:', arguments[0]);
  }
});

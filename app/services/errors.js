import Service from '@ember/service';

export default Service.extend({
  handle: response => {
    console.error('Caught server errors...');
    console.error(response.errors);
  }
});

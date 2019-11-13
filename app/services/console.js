import Service from '@ember/service';

export default Service.extend({
  log(msg) {
    console.log(msg);
  },

  warn(msg) {
    console.warn(msg);
  },

  debug(msg) {
    console.debug(msg);
  },

  error(msg) {
    console.error(msg);
  }
});

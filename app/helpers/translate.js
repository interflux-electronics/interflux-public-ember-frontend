import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class TranslateHelper extends Helper {
  @service translation;

  // init() {
  //   super.init(...arguments);
  //   this.i18n.addChangeListener(this.localeChanged);
  // }
  //
  // willDestroy() {
  //   super.willDestroy();
  //   this.i18n.removeChangeListener(this.localeChanged);
  // }
  //
  // localeChanged = () => {
  //   this.recompute();
  // }

  // compute([key]) {
  //   return this.i18n.translate(key);
  // }

  compute(params) {
    const key = params[0];
    const locale = params[1] || this.translation.locale;
    const str =
      this.translation.data[key][locale] || this.translation.data[key]['en'];
    return str;
  }
}

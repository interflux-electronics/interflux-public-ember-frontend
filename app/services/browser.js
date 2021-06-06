import Service from '@ember/service';

export default class BrowserService extends Service {
  get supportsWEBP() {
    // The canvas check below doesn't work in Firefox.
    // Therefor, we'll assume all Firefox users have WEBP support.
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      return true;
    }

    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      // Was able or not to get WebP representation.
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    } else {
      // Is either old browser like IE 8 or recent Firefox.
      return false;
    }
  }
}

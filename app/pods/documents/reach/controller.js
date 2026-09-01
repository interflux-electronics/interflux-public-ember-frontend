import Controller from '@ember/controller';

export default class DocumentsReachController extends Controller {
  get mailto() {
    const to = 'reach@interflux.com';
    const subject = encodeURIComponent('Request for REACH related document');

    return `mailto:${to}?subject=${subject}`;
  }
}

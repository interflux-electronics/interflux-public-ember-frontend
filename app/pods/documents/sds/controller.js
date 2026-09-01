import Controller from '@ember/controller';

export default class DocumentsSdsController extends Controller {
  get mailto() {
    const to = 'reach@interflux.com';
    const subject = encodeURIComponent('Request for SDS');

    return `mailto:${to}?subject=${subject}`;
  }
}

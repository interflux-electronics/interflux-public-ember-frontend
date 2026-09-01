import Controller from '@ember/controller';

export default class DocumentsRequestController extends Controller {
  get mailto() {
    const to = 'reach@interflux.com';
    const subject = encodeURIComponent('Request for document');

    return `mailto:${to}?subject=${subject}`;
  }
}

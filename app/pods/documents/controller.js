import Controller from '@ember/controller';

export default class DocumentsController extends Controller {
  get categories() {
    return this.model.categories.filterBy('hasDocuments').sortBy('order');
  }
}

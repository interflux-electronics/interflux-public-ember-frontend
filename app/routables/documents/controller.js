import Controller from '@ember/controller';

export default class DocumentsController extends Controller {
  get sortedCategories() {
    return this.model.categories.sortBy('order');
  }
}

import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ProductsMixController extends Controller {
  @tracked title;
  @tracked products;
}

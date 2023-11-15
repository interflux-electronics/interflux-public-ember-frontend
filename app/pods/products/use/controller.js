import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ProductsUseSelectedController extends Controller {
  @tracked title;
  @tracked products;
  @tracked use;
}

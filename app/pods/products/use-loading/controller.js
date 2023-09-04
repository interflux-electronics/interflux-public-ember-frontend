import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ProductsUseLoadingController extends Controller {
  @tracked title = 'Loading ...';
}

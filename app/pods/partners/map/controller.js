import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class PartnersMapController extends Controller {
  queryParams = ['show'];

  @tracked show = null;
}

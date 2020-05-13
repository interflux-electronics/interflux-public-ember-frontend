import Controller from '@ember/controller';

export default class CompanyController extends Controller {
  get count() {
    return new Date().getFullYear() - 1980;
  }
}

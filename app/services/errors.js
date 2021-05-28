import Service from '@ember/service';

export default class ErrorsService extends Service {
  handle(response) {
    console.error('Caught server errors...');
    console.error(response.errors);
  }
}

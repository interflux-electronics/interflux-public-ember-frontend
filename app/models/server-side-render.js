import Model, { attr } from '@ember-data/model';

export default class ServerSideRenderModel extends Model {
  @attr('string') visitId;
  @attr('string') host;
  @attr('string') referrer;
  @attr('string') userAgent;
}

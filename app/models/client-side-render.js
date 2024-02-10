import Model, { attr } from '@ember-data/model';

export default class ClientSideRenderModel extends Model {
  @attr('string') visitId;
  @attr('string') host;
  @attr('string') referrer;
  @attr('string') userAgent;
  @attr('string') viewportWidth;
  @attr('string') viewportHeight;
  @attr('string') userId;
}

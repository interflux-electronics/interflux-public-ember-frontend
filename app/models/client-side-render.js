import Model, { attr } from '@ember-data/model';

export default class ClientSideRenderModel extends Model {
  @attr('string') host;
  @attr('string') path;
  @attr('string') referrer;
  @attr('string') userAgent;
  @attr('string') viewportWidth;
  @attr('string') viewportHeight;
  @attr('string') serverSideRenderId; // is relation on backend only
  @attr('string') userId; // is relation on backend only
}

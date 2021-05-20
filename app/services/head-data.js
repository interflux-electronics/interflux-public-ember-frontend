import ENV from 'interflux/config/environment';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class HeadDataService extends Service {
  @service language;
  @service router;

  @tracked type = 'website';
  @tracked locale = 'en_US';
  @tracked robot = 'index, follow';
  @tracked path = '';

  // Why not just do window.location.href?
  // Because Fastboot runs in Node and has no concept of the browser window.
  get url() {
    return `${ENV.publicHost}/${this.language.locale}${this.path}`;
  }

  @tracked title = 'Interflux Electronics';
  @tracked description =
    'We develop chemistry for soldering electronics: soldering fluxes, solder pastes, solder wires, solder alloys and more.';

  @tracked imagePath = '';
  @tracked imageMime = 'image/jpeg';
  @tracked imageWidth = '1200';
  @tracked imageHeight = '600';
  @tracked imageAlt = 'logo';

  get imageURL() {
    return `${ENV.cdnHost}${this.imagePath}`;
  }

  get gitBranch() {
    return ENV.gitBranch;
  }

  get gitRevision() {
    return ENV.gitRevision;
  }

  get buildTimestamp() {
    return ENV.buildTimestamp;
  }

  get environment() {
    return ENV.environment;
  }
}

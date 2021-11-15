// This service exposes control over the <Page> component to the rest of the app.

import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PageService extends Service {
  @tracked id = null; // The ID attribute added to the <main>.
  @tracked title = null; // The title shown on the mobile header.
  @tracked backRoute = null; // For the back button on mobile <header>.
  @tracked backModel = null; // For the back button on mobile <header>.
  @tracked crumbs = null; // For building the breadcrumbs.
  @tracked mainClasses = null; // For adding modifier CSS classes to the <main>.
  @tracked headerTheme = null; //
  @tracked shownHeaderMenu = null;

  update(props) {
    this.reset();
    for (const [key, value] of Object.entries(props)) {
      this[key] = value;
    }
  }

  reset() {
    this.id = null;
    this.title = null;
    this.backRoute = null;
    this.backModel = null;
    this.crumbs = null;
    this.mainClasses = null;
  }
}

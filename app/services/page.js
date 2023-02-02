// This service exposes control over the <Page> component to the rest of the app.

import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PageService extends Service {
  @tracked id; // The ID attribute added to the <main>.
  @tracked title; // The title shown on the mobile header.
  @tracked backRoute; // For the back button on mobile <header>.
  @tracked backModel; // For the back button on mobile <header>.
  @tracked crumbs; // For building the breadcrumbs.
  @tracked mainClasses; // For adding modifier CSS classes to the <main>.
  @tracked theme;
  @tracked showHeader = false;
  @tracked showFooter = false;
  @tracked showLoading = false;

  // To allow the <Page> component to close the menus in the <header>.
  @tracked shownHeaderMenu = false;

  update(props) {
    this.reset();

    // Iterate over all properties passed in an set them.
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
    this.theme = null;
    this.showHeader = true;
    this.shownHeaderMenu = null; // dropdown menus
    this.showFooter = true;
    this.showLoading = false;
  }
}

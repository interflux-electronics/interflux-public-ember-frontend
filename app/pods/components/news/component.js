import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NewsComponent extends Component {
  @service news;

  @tracked showDuvet = false;
  @tracked showID = null;

  @action show(id) {
    this.showID = id;
    this.showDuvet = !this.showDuvet;
  }

  get newsItems() {
    return ['oritech']; // TEMPORARY
    // return this.notifications.items;
  }

  get hasNewsItems() {
    return this.newsItems.length > 0 && this.hasFeatureFlag;
  }

  // ?feature=news
  get hasFeatureFlag() {
    const params = new URLSearchParams(document.location.search);
    const feature = params.get('feature');

    return feature === 'news';
  }
}

import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import ENV from 'interflux/config/environment';
import { inject as service } from '@ember/service';

export default class ProductController extends Controller {
  @service translation;

  @tracked chosenImage = null;

  get avatar() {
    return this.model.product.productImages.find(
      (img) => img.path === this.model.product.avatarPath
    );
  }

  get firstImage() {
    const images = this.model.product.productImages;

    return images && images.length > 0 ? this.images.firstObject : null;
  }

  get heroImage() {
    return this.chosenImage
      ? this.chosenImage
      : this.avatar
      ? this.avatar
      : this.firstImage
      ? this.firstImage
      : null;
  }

  get images() {
    return this.model.product.productImages
      .filterBy('public', true)
      .sortBy('rank')
      .mapBy('image');
  }

  @action
  setHero(image) {
    this.chosenImage = image;
  }

  get useAccordionSections() {
    return this.model.product.uses.map((use) => {
      const id = use.get('id');
      const label = use.get('label');
      const gist = use.get('gist');

      return {
        iconURL: use.get('iconURL'),
        label: this.translation.t(label, 'use.1', id),
        content: gist ? this.translation.t(gist, 'use.2', id) : null
      };
    });
  }

  get qualityAccordionSections() {
    return this.model.product.qualities.map((quality) => {
      const id = quality.get('id');
      const label = quality.get('label');
      const gist = quality.get('gist');

      return {
        iconURL: quality.get('iconURL'),
        label: this.translation.t(label, 'quality.1', id),
        content: gist ? this.translation.t(gist, 'quality.2', id) : null
      };
    });
  }

  get documentAccordionSections() {
    return this.model.product.documents.map((doc) => {
      const links = doc.get('files').map((file) => {
        return {
          label: file.language,
          url: file.url
        };
      });

      const n = links.length;

      return {
        iconURL: `${ENV.cdnHost}/images/icons/file-download.svg`,
        label: `${doc.get('name')} (PDF)`,
        content: this.translation.t(
          `Available in ${n} languages:`,
          'product.28',
          n
        ),
        links
      };
    });
  }

  get showCompliance() {
    return (
      this.model.product.compliesWithIPC ||
      this.model.product.compliesWithIEC ||
      this.model.product.compliesWithROHS ||
      this.model.product.compliesWithISO
    );
  }

  @action
  openOrderModal() {
    console.log('openShareModal');
  }

  @action
  openShareModal() {
    console.log('openShareModal');
  }
}

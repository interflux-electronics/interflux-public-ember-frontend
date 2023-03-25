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
      return {
        iconURL: use.get('iconURL'),
        label: this.translation.t(use.get('label'), 'use.1', use.get('id')),
        content: this.translation.t(use.get('gist'), 'use.2', use.get('id'))
        // links: [
        //   {
        //     label: `Learn more about ${use.get('text')}`,
        //     route: 'article',
        //     model: 'article-123'
        //   },
        //   {
        //     label: `All products for ${use.get('text')}`,
        //     route: 'products',
        //     model: use.get('slug')
        //   }
        // ]
      };
    });
  }

  get qualityAccordionSections() {
    return this.model.product.qualities.map((quality) => {
      return {
        iconURL: quality.get('iconURL'),
        label: this.translation.t(
          quality.get('label'),
          'quality.1',
          quality.get('id')
        ),
        content: this.translation.t(
          quality.get('gist'),
          'quality.2',
          quality.get('id')
        )
        // links: [
        //   {
        //     label: `Learn more about ${use.get('text')}`,
        //     route: 'article',
        //     model: 'article-123'
        //   },
        //   {
        //     label: `All products with ${use.get('text')}`,
        //     route: 'products',
        //     model: use.get('slug')
        //   }
        // ]
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

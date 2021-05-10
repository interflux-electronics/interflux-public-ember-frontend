import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProductController extends Controller {
  @tracked chosenImage = null;

  get avatar() {
    return this.model.product.image;
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
    return this.model.product.uses.map(use => {
      return {
        iconURL: use.get('iconURL'),
        buttonLabel: use.get('label'),
        textShownOnExpand: use.get('gist')
        // links: [
        //   {
        //     label: `Learn more about ${use.get('text')}`,
        //     route: 'home.article',
        //     model: 'article-123'
        //   },
        //   {
        //     label: `All products for ${use.get('text')}`,
        //     route: 'home.products',
        //     model: use.get('slug')
        //   }
        // ]
      };
    });
  }

  get qualityAccordionSections() {
    return this.model.product.qualities.map(quality => {
      return {
        iconURL: quality.get('iconURL'),
        buttonLabel: quality.get('label'),
        textShownOnExpand: quality.get('gist')
        // links: [
        //   {
        //     label: `Learn more about ${use.get('text')}`,
        //     route: 'home.article',
        //     model: 'article-123'
        //   },
        //   {
        //     label: `All products with ${use.get('text')}`,
        //     route: 'home.products',
        //     model: use.get('slug')
        //   }
        // ]
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
}

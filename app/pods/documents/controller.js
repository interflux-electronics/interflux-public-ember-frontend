import Controller from '@ember/controller';
import ENV from 'interflux/config/environment';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DocumentsController extends Controller {
  @service translation;

  get categories() {
    return [
      {
        id: 'TD',
        label: 'TD',
        long: this.translation.t('TD', 'doc.new.17'),
        icon: 'file-spreadsheet'
      },
      {
        id: 'SDS',
        label: 'SDS',
        long: this.translation.t('SDS', 'doc.new.16'),
        icon: 'file-medical'
      },
      {
        id: 'REACH',
        label: this.translation.t('REACH', '15'),
        icon: 'flask-potion'
      },
      {
        id: 'certificates',
        label: this.translation.t('certificate', 'doc.new.14'),
        icon: 'file-certificate'
      },
      {
        id: 'declarations',
        label: this.translation.t('declaration', 'doc.new.13'),
        icon: 'megaphone'
      },
      {
        id: 'webinars',
        label: this.translation.t('webinar', 'doc.new.12'),
        icon: 'video'
      },
      {
        id: 'guides',
        label: this.translation.t('guide', 'doc.new.11'),
        icon: 'lightbulb'
      },
      {
        id: 'presentations',
        label: this.translation.t('presentation', 'doc.new.10'),
        icon: 'presentation'
      }
    ];
  }

  get languages() {
    return [
      { id: 'EN', label: this.translation.t('English', 'doc.new.6') },
      { id: 'DE', label: this.translation.t('German', 'doc.new.7') },
      { id: 'FR', label: this.translation.t('French', 'doc.new.8') },
      { id: 'JA', label: this.translation.t('Japanese', 'doc.new.9') }
    ];
  }

  // The filters as set by the users
  @tracked query = '';
  @tracked category = undefined;
  @tracked language = undefined;

  // Extend the list of Document records as served by the API:
  //
  // * Create 1 row per translation variant on Document record
  // * Create 1 row per product for SDS
  // * Create 1 row for REACH
  //
  get extendedDocs() {
    const english = this.languages.find((l) => l.id === 'EN');
    const sds = this.categories.find((c) => c.id === 'SDS');
    const reach = this.categories.find((c) => c.id === 'REACH');

    const list = this.model.documents
      .map((doc) => {
        return doc.variations.split(',').map((ext) => {
          let language = this.languages.find((l) => l.id === ext.split('.')[0]);

          // For documents without language naming convention, assume English.
          if (!language) {
            language = this.languages.find((l) => l.id === 'EN');
          }

          return {
            label: doc.name,
            language,
            category: this.categories.find(
              (c) => c.id === doc.documentCategory.get('id')
            ),
            url: `${ENV.cdnHost}/${doc.path}-${ext}`
          };
        });
      })
      .flat();

    this.model.products.forEach((p) => {
      list.push({
        id: p.get('id'),
        label: `SDS ${p.name}`,
        language: english,
        category: sds,
        route: 'documents.sds'
      });
    });

    list.push({
      id: 'reach',
      label: this.translation.t('REACH related documents', 'doc.new.18'),
      language: english,
      category: reach,
      route: 'documents.reach'
    });

    return list;
  }

  get sortedDocs() {
    return this.extendedDocs.sortBy('label');
    // $derived(chain(extendedDocs).sortBy('label'));
  }

  get filteredDocs() {
    let arr = this.sortedDocs;

    // Split search queries in to words so that "pac mlf" would show "IF Pacific 2009MLF"
    if (this.query) {
      const words = this.query.trim().split(' ');

      // Filter the original list
      arr = arr.filter((file) => {
        // All words in the search query must match
        return words.every((word) => {
          const regex = new RegExp(word, 'gi');

          return regex.test(file.label);
        });
      });
    }

    if (this.category) {
      arr = arr.filter((file) => file.category?.id === this.category?.id);
    }

    if (this.language) {
      arr = arr.filter((file) => file.language?.id === this.language?.id);
    }

    return arr;
  }

  get count() {
    return this.filteredDocs.length;
  }

  get count_in_words() {
    if (this.count < 1) {
      return `${this.translation.t('No matches found for:', 'doc.new.19')} ${
        this.query
      }`;
    }

    if (this.count === 1) {
      return this.translation.t('1 document', 'doc.new.20');
    }

    return `${this.count} ${this.translation.t('"documents"', 'doc.new.21')}`;
  }

  // The amount of docs shown on page load
  @tracked TRUNC = 12;

  // Truncate the list on page load
  @tracked showAll = false;

  // The documents the user gets to see (after extend, sort, filter and truncate)
  get shownDocs() {
    return this.showAll
      ? this.filteredDocs
      : this.filteredDocs.slice(0, this.TRUNC);
  }

  get categoryOptions() {
    return this.categories.filter((cat) => {
      return this.filteredDocs.find((file) => file.category.id === cat.id);
    });
  }

  get languageOptions() {
    return this.languages.filter((lang) => {
      return this.filteredDocs.find((file) => file.language.id === lang.id);
    });
  }

  @action
  openRequestDocumentModal(event) {
    console.log('open modal');
  }

  // @action
  // openModal(doc) {
  //   console.log('clicked doc', doc.label);
  // }

  @action
  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  @action
  onKeyUp(e) {
    this.query = e.currentTarget.value;
  }
}

import EmberRouter from '@ember/routing/router';
import ENV from 'interflux/config/environment';

export default class Router extends EmberRouter {
  location = ENV.locationType;
  rootURL = ENV.rootURL;
}

Router.map(function () {
  const language = ENV.LANGUAGE || 'en';

  const translations = {
    de: {
      product: 'Produkt',
      products: 'Produkte',
      webinars: 'Webinare',
      company: 'Unternehmen',
      documents: 'Dokumente',
      contacts: 'Kontakte',
      partners: 'Partner',
      map: 'Karte'
    },
    es: {
      product: 'producto',
      products: 'productos',
      webinars: 'seminarios-web',
      company: 'empresa',
      documents: 'documentos',
      contacts: 'contactos',
      partners: 'socios',
      map: 'mapa'
    },
    fr: {
      product: 'produit',
      products: 'produits',
      webinars: 'seminaires-en-ligne',
      company: 'entreprise',
      documents: 'documents',
      contacts: 'contacts',
      partners: 'partenaires',
      map: 'carte'
    }
  };

  // Translates section of the URI
  const t = (english) => {
    const list = translations[language];

    if (!list) {
      return english;
    }

    return list[english] || english;
  };

  this.route('product', { path: `/${t('product')}/:id` });
  this.route('products', { path: `/${t('products')}` }, function () {
    this.route('subset', { path: '/:slug' });
  });
  this.route('webinars', { path: `/${t('webinars')}` }, function () {
    this.route('watch', { path: '/:webinar' });
  });
  this.route('company', { path: `/${t('company')}` });
  this.route('documents', { path: `/${t('documents')}` }, function () {
    this.route('category', { path: '/:category' });
  });
  this.route('contact', { path: `/${t('contacts')}` });
  this.route('partners', { path: `/${t('partners')}` }, function () {
    this.route('map', { path: `/${t('map')}` });
  });
  this.route('catchall', { path: '*:' });

  // For future reference:
  // We may want to pick up this pattern for some languages...
  //
  // this.route('language', { path: `/:language` }, function () {
  //   this.route('product', { resetNamespace: true, path: `/product/:id` });
  //   this.route('products', { resetNamespace: true }, function () {
  //     this.route('subset', { path: '/:slug' });
  //   });
  //   this.route('webinars', { resetNamespace: true }, function () {
  //     this.route('watch', { path: '/:webinar' });
  //   });
  //   this.route('company', { resetNamespace: true });
  //   this.route('documents', { resetNamespace: true }, function () {
  //     this.route('category', { path: '/:category' });
  //   });
  //   this.route('contact', { resetNamespace: true });
  //   this.route('partners', { resetNamespace: true }, function () {
  //     this.route('map');
  //   });
  //   this.route('catchall', { path: '*:' });
  // });
});

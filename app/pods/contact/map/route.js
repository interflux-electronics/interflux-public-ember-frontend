import ModalRoute from 'interflux/pods/components/modal/route';
import { hash } from 'rsvp';

export default class ContactMapRoute extends ModalRoute {
  model(params) {
    const countries = this.modelFor('contact').countries;
    const companies = this.modelFor('contact').companies;
    const company =
      params.slug === 'map' ? null : companies.findBy('slug', params.slug);

    console.log({ countries });
    console.log({ companies });
    console.log({ company });

    return hash({ countries, companies, company });
  }

  afterModel(model) {
    const { company, companies } = model;
    const title = company
      ? `${company.businessName} – Interflux`
      : 'Distributors Worldwide – Interflux';
    const description = company
      ? `Contact ${company.businessName} in ${company.country.nameEnglish} to order Interflux products and for technical questions.`
      : `The Interflux distribution network has ${companies.count} partners world wide for you to order from.`;

    this.headData.setProperties({
      title,
      description,
      loadMapBox: true
    });

    // this.headData.setImage({
    //   path: avatarPath,
    //   variations: avatarVariations,
    //   alt: [avatarAlt, avatarCaption].filter((x) => !!x).join(' ')
    // });
    // this.page.update({
    //   id: 'contact-map',
    //   title: businessName,
    //   backRoute: 'contact',
    //   crumbs: [
    //     { label: 'Interflux', route: 'home' },
    //     { label: 'Contact', route: 'contact' },
    //     { label: businessName }
    //   ]
    // });
  }
}

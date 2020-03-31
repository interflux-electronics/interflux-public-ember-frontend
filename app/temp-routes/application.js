import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    this.store.createRecord('hero', {
      group: 'index',
      route: 'products',
      title: 'Products',
      image: `/images/random/random-${Math.floor(Math.random() * 14) + 1}.jpg`
    });
    this.store.createRecord('hero', {
      group: 'index',
      route: 'feed',
      title: 'Feed',
      image: `/images/random/random-${Math.floor(Math.random() * 14) + 1}.jpg`
    });
    this.store.createRecord('hero', {
      group: 'index',
      route: 'academy',
      title: 'Academy',
      image: `/images/random/random-${Math.floor(Math.random() * 14) + 1}.jpg`
    });
    this.store.createRecord('hero', {
      group: 'index',
      route: 'contact',
      title: 'Contact',
      image: `/images/random/random-${Math.floor(Math.random() * 14) + 1}.jpg`
    });
  }
});

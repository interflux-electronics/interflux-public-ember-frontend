import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class VisitService extends Service {
  @service fastboot;
  @service uuid;

  // A unique UUID given to this website session. It will:
  // * be remembered across all Ember routes.
  // * added to all requests coming from Ember.
  // * help group requests for analytics
  @tracked id;

  create() {
    if (this.fastboot.isFastBoot) {
      // 1. Fastboot creates a unique UUID for this visit.
      this.id = this.uuid.generate();

      // 2. Fastboot passes this ID down to Ember.
      this.fastboot.shoebox.put('visit', this.id);
      console.log('🧩 fastboot created visit', this.id);
    } else {
      // 3. Ember retrieves the ID passed down from Fastboot.
      const id = this.fastboot.shoebox.retrieve('visit');

      if (id) {
        // 4. Ember remembers ID for all requests going forward.
        this.id = id;
        console.log('🧩 ember found ID in shoebox', this.id);
      } else {
        // 5. If anything went wrong with Fastboot, create a UUID with Ember.
        this.id = this.uuid.generate();
        console.log('🧩 ember created visit 🔥🔥🔥', this.id);
      }
    }
  }
}

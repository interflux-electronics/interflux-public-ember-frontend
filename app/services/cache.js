import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CacheService extends Service {
  @tracked categories;
  @tracked companies;
  @tracked countries;
  @tracked documents;
  @tracked events;
  @tracked families;
  @tracked markets;
  @tracked products;
  @tracked productUses;
  @tracked productQualities;
  @tracked qualities;
  @tracked uses;
  @tracked webinars;
}

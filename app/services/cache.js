import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CacheService extends Service {
  @tracked categories;
  @tracked companies;
  @tracked countries;
  @tracked documents;
  @tracked markets;
  @tracked webinars;
  @tracked products;
  @tracked families;
  @tracked uses;
  @tracked qualities;
  @tracked productUses;
  @tracked productQualities;
}

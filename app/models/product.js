import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default Model.extend({
  slug: attr('string'),
  name: attr('string'),
  pitch: attr('string'),

  // public: attr('boolean'),
  // deprecated: attr('boolean'),
  // orderable: attr('boolean'),
  // popular: attr('boolean'),
  // new: attr('boolean'),

  productFamily: belongsTo('product-family'),
  // avatar: belongsTo('image'),

  // images: hasMany('product-image'),
  // variants: hasMany('product-variant'),
  features: hasMany('feature'),

  family: alias('productFamily'),

  hasFeature(slug) {
    return this.features.any(f => f.slug === slug);
  }
});

const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  nameEn: { type: String, required: true },
  nameHi: { type: String },
  nameTe: { type: String },
  descriptionEn: { type: String, required: true },
  descriptionHi: { type: String },
  descriptionTe: { type: String },
  eligibilityEn: { type: String },
  eligibilityHi: { type: String },
  eligibilityTe: { type: String },
  benefitsEn: { type: String },
  benefitsHi: { type: String },
  benefitsTe: { type: String },
  category: { type: String, required: true },
  subCategory: { type: String },
  provider: { type: String, required: true },
  website: { type: String },
  applyMode: { type: String, default: 'online' },
  states: [{ type: String }],
  requiredDocuments: [{ type: String }],
  imageUrl: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Scheme', schemeSchema);

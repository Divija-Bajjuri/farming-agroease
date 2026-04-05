const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  nameEn: { type: String, required: true },
  nameHi: { type: String },
  nameTe: { type: String },
  crop: { type: String, required: true },
  symptomsEn: { type: String, required: true },
  symptomsHi: { type: String },
  symptomsTe: { type: String },
  causesEn: { type: String },
  causesHi: { type: String },
  causesTe: { type: String },
  treatmentEn: { type: String },
  treatmentHi: { type: String },
  treatmentTe: { type: String },
  preventionEn: { type: String },
  preventionHi: { type: String },
  preventionTe: { type: String },
  severity: { type: String, default: 'medium' },
  imageUrls: [{ type: String }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Disease', diseaseSchema);

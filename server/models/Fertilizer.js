const mongoose = require('mongoose');

const fertilizerSchema = new mongoose.Schema({
  nameEn: { type: String, required: true },
  nameHi: { type: String },
  nameTe: { type: String },
  type: { type: String, required: true },
  npkRatio: { type: String },
  descriptionEn: { type: String },
  descriptionHi: { type: String },
  descriptionTe: { type: String },
  usageEn: { type: String },
  usageHi: { type: String },
  usageTe: { type: String },
  crops: [{ type: String }],
  stages: [{ type: String }],
  dosagePerAcre: { type: String },
  pricePerKg: { type: Number },
  imageUrl: { type: String },
  isOrganic: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Fertilizer', fertilizerSchema);

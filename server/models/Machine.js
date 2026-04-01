const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true }, // Tractor, Harvester, Rotavator, etc.
  brand: { type: String },
  model: { type: String },
  description: { type: String },
  pricePerHour: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  location: { type: String, required: true },
  district: { type: String },
  state: { type: String, default: 'Telangana' },
  contact: { type: String, required: true },
  imageUrl: { type: String },
  available: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

// Index for searching
machineSchema.index({ location: 1, type: 1, available: 1 });

module.exports = mongoose.model('Machine', machineSchema);

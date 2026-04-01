const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  machine: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine', required: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  location: { type: String, required: true },
  bookingType: { type: String, enum: ['hourly', 'daily'], required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  fromTime: { type: String },
  toTime: { type: String },
  totalDays: { type: Number, default: 0 },
  totalHours: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
    default: 'pending' 
  },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);

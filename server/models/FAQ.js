const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  questionEn: { type: String, required: true },
  questionHi: { type: String },
  questionTe: { type: String },
  answerEn: { type: String, required: true },
  answerHi: { type: String },
  answerTe: { type: String },
  category: { type: String, required: true },
  subCategory: { type: String },
  keywords: [{ type: String }],
  priority: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('FAQ', faqSchema);

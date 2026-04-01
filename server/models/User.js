const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  mobile: { type: String, required: true, unique: true },
  email: { type: String },
  password: { type: String, required: true },
  village: { type: String, default: '' },
  district: { type: String, default: '' },
  state: { type: String, default: 'Telangana' },
  farmSize: { type: String, default: '' },
  cropTypes: [{ type: String }],
  preferredLanguage: { type: String, default: 'en' },
  role: { type: String, default: 'farmer' }, // farmer, admin
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
